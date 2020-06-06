# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG IMAGE_FROM=kegbase:latest
FROM $IMAGE_FROM as builder

WORKDIR /keg

# These args are expected to be set as --build-arg
# for the GIT_KEY=key_value AND GIT_TAP_URL=key_value
# Which Allow them to be accessed durring build time
ARG GIT_KEY
ARG GIT_TAP_URL

# Path of the keg cli within the docker container
ARG DOC_CLI_PATH=/keg/keg-cli

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/tap

# Path where node_modules will be installed durring docker built
ARG NM_CACHE=/keg/nm-cache/tap

# Default package ip address, should be the same as the docker-keg ip address
ARG RN_PACKAGER_IP

# Update git calls to github to include the key so private repos can be pulled
# Pull down the keg-core locally
RUN set -ex; \
  if [ ! -z "$GIT_TAP_URL" ]; then \
    git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    git clone $GIT_TAP_URL $DOC_APP_PATH; \
    git config --global url.https://github.com/.insteadOf https://$GIT_KEY@github.com/; \
  fi

# Copy over the package.json, and yarn.lock files
COPY package.json $NM_CACHE/package.json
COPY yarn.lock $NM_CACHE/yarn.lock

# Install the dependecies with yarn setup, then remove the .npmrc
RUN cd $NM_CACHE; \
    echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc; \
    echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc; \
    yarn setup; \
    yarn cache clean; \
    rm -f .npmrc

FROM node:12.8-alpine
WORKDIR /keg

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME="$RN_PACKAGER_IP"

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn

# Copy over keg cli from kegbase
COPY --from=builder $DOC_CLI_PATH $DOC_CLI_PATH

# Copy over the cloned app
COPY --from=builder $DOC_APP_PATH $DOC_APP_PATH

# Copy over keg cli from above
COPY --from=builder $NM_CACHE $NM_CACHE

# Expose the default http and https ports
EXPOSE 80
EXPOSE 443

# Run the start script
# Dont use the array syntax, so we have access to the DOC_CLI_PATH ENV
CMD /bin/bash $DOC_CLI_PATH/containers/tap/run.sh