FROM node:12.8-alpine AS builder

# These args are expected to be set as --build-arg
# for the GIT_KEY=key_value AND GIT_CLI_URL=key_value
# Which Allow them to be accessed durring build time
ARG GIT_KEY
ARG GIT_CLI_URL

# Set the default expojs version to it's locked down
ARG EXPO_CLI_VERSION="3.21.5"

# Default package ip address, should be the same as the docker-keg ip address
ARG RN_PACKAGER_IP

WORKDIR /keg

# Install git and the expo-cli
# TODO: Look into adding sharp-cli, to allow smaller bundle sizes
RUN apk --no-cache add git; \
    yarn global add expo-cli@$EXPO_CLI_VERSION

# Pull down the keg-cli locally
RUN set -ex; \
  if [ ! -z "$GIT_CLI_URL" ]; then \
    git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    git clone $GIT_CLI_URL $DOC_CLI_PATH; \
    git config --global url.https://github.com/.insteadOf https://$GIT_KEY@github.com/; \
  fi

# Copy over our package json and yarn lock files
COPY package.json yarn.lock ./

# Cd into the docker cli path, and run yarn install
# Then remove the .npmrc
RUN cd $DOC_CLI_PATH; \
    echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc; \
    echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc; \
    yarn install --frozen-lockfile; \
    yarn cache clean; \
    rm -f .npmrc

# Use a multi stage build for security
# This is so GIT_KEY is not accessable in the final image
FROM node:12.8-alpine
WORKDIR /keg

# Install git for the new stage
# This is so Dockerfiles that pull from the image, don't have to
RUN apk --no-cache add git

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn

# Copy over keg cli from above
COPY --from=builder $DOC_CLI_PATH $DOC_CLI_PATH

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME="$RN_PACKAGER_IP"

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
