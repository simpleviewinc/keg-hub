# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG IMAGE_FROM=keg-base:latest
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

# Copy over the package.json, and yarn.lock files
COPY . /keg-temp/

# Update the build steps git config to include the key
RUN git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \

# Pull down the tap locally if a git tap url exists
# Otherwise copy over the local version from keg-temp
RUN if [ "$GIT_TAP_URL" != "INITIAL" ]; then \
      git clone $GIT_TAP_URL $DOC_APP_PATH; \
      rm -rf /keg-temp; \
    else \
      cp -R /keg-temp/ $DOC_APP_PATH; \
    fi

# Install the dependecies with yarn setup, then remove the .npmrc
RUN cd $DOC_APP_PATH; \
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

# Copy over keg cli from keg-base
COPY --from=builder $DOC_CLI_PATH $DOC_CLI_PATH

# Copy over the cloned app
COPY --from=builder $DOC_APP_PATH $DOC_APP_PATH

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