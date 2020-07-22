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
ARG GIT_COMPONENTS_URL=INITIAL

# Should we use the local copy of the keg-core repo when building
ARG KEG_COPY_LOCAL

# Path of the keg cli within the docker container
ARG DOC_CLI_PATH=/keg/keg-cli

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/keg-components

# Copy over the local keg-components repo to a temp dir
COPY . /keg-temp/

# Update git calls to github to include the key so private repos can be pulled
# Pull down the tap locally if a git tap url exists
# Otherwise copy over the local version from keg-temp
RUN git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    if [ -z "$KEG_COPY_LOCAL" ] && [ "$GIT_COMPONENTS_URL" != "INITIAL" ]; then \
      echo "[ Keg-CLI ] Pulling keg-components from github"; \
      git clone $GIT_COMPONENTS_URL $DOC_APP_PATH; \
    else \
      echo "[ Keg-CLI ] Using local keg-components repo"; \
      cp -R /keg-temp/ $DOC_APP_PATH; \
    fi; \
    rm -rf /keg-temp

# Copy over the package.json, and yarn.lock files
COPY package.json $DOC_APP_PATH/
COPY *.lock $DOC_APP_PATH/

# Install the dependecies with yarn install, then remove the .npmrc
RUN cd $DOC_APP_PATH; \
    echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc; \
    echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc; \
    yarn install; \
    yarn cache clean; \
    rm -f .npmrc

# ------- New Build Stage ------- #

# Use a multi stage build for security
# This is so GIT_KEY is not accessable in the final image
FROM $GIT_STAGE_IMAGE_FROM as gitBuilder
WORKDIR /

# Path of the keg cli within the docker container
ARG DOC_CLI_PATH=/keg/keg-cli

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/keg-components

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME $KEG_DOCKER_IP

# Set GIT_KEY to be empty value so yarn install doesn't fail
ENV GIT_KEY=""

# Install git for the new stage
RUN apk add --no-cache git bash

# RUN mv /etc/profile.d/color_prompt /etc/profile.d/color_prompt.sh

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn
# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

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

# Set the current directory to keg-core repo
WORKDIR /$DOC_APP_PATH

# Run the start script
# Dont use the array syntax, so we have access to the DOC_CLI_PATH ENV
CMD /bin/bash $DOC_CLI_PATH/containers/components/run.sh
