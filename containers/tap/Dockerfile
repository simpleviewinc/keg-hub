# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG IMAGE_FROM=kegbase:latest
FROM $IMAGE_FROM as builder

WORKDIR /

# These args are expected to be set as --build-arg
# Which Allow them to be used durring the build
ARG GIT_KEY
ARG GIT_TAP_URL

# Path of the keg cli within the docker container
ARG DOC_CLI_PATH=/keg/keg-cli

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/tap

# Path where node_modules will be installed durring docker built
ARG NM_CACHE=/keg/nm-cache/tap

# Update git calls to github to include the key so private repos can be pulled
# Pull down the keg-core locally
RUN git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    git clone $GIT_TAP_URL $DOC_APP_PATH; \
    git config --global url.https://github.com/.insteadOf https://$GIT_KEY@github.com/; \
    rm -rf $DOC_APP_PATH/.npmrc

# Copy over the package.json, and yarn.lock files
COPY package.json $NM_CACHE/

# Install the dependecies with yarn setup, then remove the .npmrc
RUN cd $NM_CACHE; \
    echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc; \
    echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc; \
    yarn setup; \
    yarn cache clean; \
    rm -f .npmrc

# ------- New Build Stage ------- #

# Use a multi stage build for security
# This is so GIT_KEY is not accessable in the final image
FROM node:12.8-alpine
WORKDIR /

# Path of the keg cli within the docker container
ARG DOC_CLI_PATH=/keg/keg-cli

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/tap

# Path where node_modules will be installed durring docker built
ARG NM_CACHE=/keg/nm-cache/tap

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME $KEG_DOCKER_IP

# Set GIT_KEY to be empty value so yarn install doesn't fail
ENV GIT_KEY=""

# Install git for the new stage
RUN apk add --no-cache git

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn

# Copy over keg cli from kegbase
COPY --from=builder $DOC_CLI_PATH $DOC_CLI_PATH

# Copy over the cloned app
COPY --from=builder $DOC_APP_PATH $DOC_APP_PATH

# Copy over keg cli from above
COPY --from=builder $NM_CACHE $NM_CACHE

# Expose container ports
EXPOSE 80
EXPOSE 443
EXPOSE 19002
EXPOSE 19006
EXPOSE 60710

# Set the current directory to tap repo
WORKDIR /$DOC_APP_PATH

# Run the start script
# Dont use the array syntax, so we have access to the DOC_CLI_PATH ENV
CMD /bin/sh $DOC_CLI_PATH/containers/tap/run.sh