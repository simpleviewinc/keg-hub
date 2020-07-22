# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG KEG_NODE_VERSION
ARG GIT_STAGE_IMAGE_FROM=node:$KEG_NODE_VERSION
ARG KEG_IMAGE_FROM=keg-base:latest

FROM $KEG_IMAGE_FROM as builder

WORKDIR /

# These args are expected to be set as --build-arg
# Which Allow them to be used durring the build
ARG GIT_KEY
ARG GIT_REGULATOR_URL=INITIAL

# Should we use the local copy of the keg-regulator repo when building
ARG KEG_COPY_LOCAL

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/keg-regulator

# Copy over the local keg-regulator repo to a temp dir
COPY . /keg-temp/

# Update git calls to github to include the key so private repos can be pulled
# Pull down the keg-regulator locally if a git regulator url exists
# Otherwise copy over the local version from keg-temp
RUN git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    if [ -z "$KEG_COPY_LOCAL" ] && [ "$GIT_REGULATOR_URL" != "INITIAL" ]; then \
      git clone $GIT_REGULATOR_URL $DOC_APP_PATH; \
    else \
      cp -R /keg-temp/ $DOC_APP_PATH; \
    fi; \
    rm -rf /keg-temp

# Copy over the package.json, and yarn.lock files
COPY package.json $DOC_APP_PATH/package.json
COPY *.lock $DOC_APP_PATH/

# Copy over the package.json, and yarn.lock files
COPY tests/package.json $DOC_APP_PATH/tests/package.json
COPY tests/*.lock $DOC_APP_PATH/tests/

# Install the dependecies with yarn install, then remove the .npmrc
RUN cd $DOC_APP_PATH; \
    echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc; \
    echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc; \
    yarn install --ignore-engines; \
    yarn cache clean; \
    rm -f .npmrc; \
    cd $DOC_APP_PATH/tests; \
    echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc; \
    echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc; \
    yarn install --ignore-engines; \
    yarn cache clean; \
    rm -f .npmrc

# ------- New Build Stage ------- #

# Use a multi stage build for security
# This is so GIT_KEY is not accessable in the final image
FROM $GIT_STAGE_IMAGE_FROM as gitBuilder
WORKDIR /

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/keg-regulator

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME $KEG_DOCKER_IP

# Set GIT_KEY to be empty value so yarn install doesn't fail
ENV GIT_KEY=""

# Install git for the new stage
RUN apk add --no-cache git bash

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn
# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Copy over the cloned app
COPY --from=builder $DOC_APP_PATH $DOC_APP_PATH

COPY run.sh $DOC_APP_PATH/run.sh

# Expose container ports
EXPOSE 80
EXPOSE 443
EXPOSE 4000
EXPOSE 4444

# Set the current directory to tap repo
WORKDIR /$DOC_APP_PATH

# Run the start script passing in sleep
# Dont use the array syntax, so we have access to the DOC_CLI_PATH ENV
CMD /bin/bash $DOC_APP_PATH/run.sh "sleep"