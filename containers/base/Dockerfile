FROM node:12.8-alpine AS builder

# These args are expected to be set as --build-arg
# Which Allow them to be used durring the build
ARG GIT_KEY
ARG GIT_CLI_URL
ARG DOC_CLI_PATH=/keg/keg-cli

# Set the default expojs version to it's locked down
ARG EXPO_CLI_VERSION="3.21.3"

WORKDIR /

# Install git and the expo-cli and sharp-cli
RUN apk add --no-cache git bash; \
    yarn global add expo-cli@$EXPO_CLI_VERSION sharp-cli

# Pull down the keg-cli locally
RUN if [ ! -z "$GIT_CLI_URL" ]; then \
    git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    git clone $GIT_CLI_URL $DOC_CLI_PATH; \
  fi

# Copy over our local containers folder to get the updated run scripts
COPY containers $DOC_CLI_PATH/containers

# ------- New Build Stage ------- #

# Use a multi stage build for security
# This is so GIT_KEY is not accessable in the final image
FROM node:12.8-alpine
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
# This is so Dockerfiles that uses "FROM kegbase", don't have to install these packages
RUN apk add --no-cache git bash

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn

# Copy over keg cli from above
COPY --from=builder $DOC_CLI_PATH $DOC_CLI_PATH

# Expose the container ports to allow connecting to it externally
EXPOSE 80
EXPOSE 443
EXPOSE 873
EXPOSE 8080
EXPOSE 8081
EXPOSE 8082
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006
EXPOSE 60710

WORKDIR /keg