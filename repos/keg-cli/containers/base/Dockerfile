ARG KEG_NODE_VERSION
ARG BASE_IMAGE_FROM=node:$KEG_NODE_VERSION

FROM $BASE_IMAGE_FROM AS builder

# These args are expected to be set as --build-arg
# Which Allow them to be used durring the build
ARG PUBLIC_GIT_KEY
ARG GIT_CLI_URL=INITIAL

# Should we use the local copy of the keg-core repo when building
ARG KEG_COPY_LOCAL

ARG DOC_CLI_PATH=/keg/keg-cli

# Set the default expojs version to it's locked down
ARG EXPO_CLI_VERSION

WORKDIR /

# Install git and the expo-cli and sharp-cli
RUN apk add --no-cache git; \
    yarn global add expo-cli@$EXPO_CLI_VERSION sharp-cli nodemon

# Copy over the local keg-components repo to a temp dir
COPY . /keg-temp/

# Update git calls to github to include the key so private repos can be pulled
# Pull down the keg-cli locally if GIT_CLI_URL
# Otherwise copy over the local version from keg-temp
RUN git config --global url.https://$PUBLIC_GIT_KEY@github.com/.insteadOf https://github.com/; \
    if [ -z "$KEG_COPY_LOCAL" ] && [ "$GIT_CLI_URL" != "INITIAL" ]; then \
      git clone $GIT_CLI_URL $DOC_CLI_PATH; \
    else \
      cp -R /keg-temp/ $DOC_CLI_PATH; \
    fi; \
    rm -rf /keg-temp

# Copy over our local containers folder to get the updated run scripts
COPY . $DOC_CLI_PATH/

# ------- New Build Stage ------- #

# Use a multi stage build for security
FROM $BASE_IMAGE_FROM AS gitBuilder
WORKDIR /

# These args are expected to be set as --build-arg
# Which Allow them to be used durring the build
ARG DOC_CLI_PATH=/keg/keg-cli

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME $KEG_DOCKER_IP

# Install git and bash for the new stage
# This is so Dockerfiles that uses "FROM keg-base", don't have to install these packages
RUN apk add --no-cache git bash nano; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    git config --global url.https://$PUBLIC_GIT_KEY@github.com/.insteadOf https://github.com/; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn

# Copy over keg cli from above
COPY --from=builder $DOC_CLI_PATH $DOC_CLI_PATH

# Expose the container ports to allow connecting to it externally
EXPOSE 80
EXPOSE 443

WORKDIR /keg
