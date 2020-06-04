# Allows overwriting where the base image is pulled from
ARG IMAGE_FROM=kegbase:latest
FROM $IMAGE_FROM

# Pull from kegbase => /usr/local/share/.config/yarn/global
# This will pull in the expo-cli
# Pull from kegbase => /keg
# This will pull in the keg-cli

WORKDIR /keg

# Add the GIT_KEY arg, and set value to initial
# This expects --build-arg GIT_KEY=key_value to be set
# Which will override the default initial value, and allow updating git
ARG GIT_KEY=INITIAL

# Update git calls to github to include the key so private repos can be pulled
RUN if [ "$GIT_KEY" != "INITIAL" ]; then \
      git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    fi

# Add the GIT_CORE_URL arg, and set value to initial
# This expects --build-arg GIT_CORE_URL=key_value to be set
# URL of the keg-core to clone from github
ARG GIT_CORE_URL=INITIAL

ARG DOC_APP_PATH=/keg/keg-core

# Pull down keg-core locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_CORE_URL" != "INITIAL" ]; then \
      git clone $GIT_CORE_URL $DOC_APP_PATH; \
    fi

ARG NM_CACHE=/keg/nm-cache/core

# Create a fake post install script for after the yarn install
RUN mkdir -p /keg/nm-cache/core/core/scripts/js; \
    touch /keg/nm-cache/core/core/scripts/js/postInstall.js

# Copy over the package.json, and yarn.lock files
COPY package.json $NM_CACHE/package.json
COPY yarn.lock $NM_CACHE/yarn.lock

# Install the dependecies
RUN cd $NM_CACHE; yarn install

EXPOSE 80

# Run the script
CMD [ "/bin/bash", "/keg/keg-cli/containers/core/run.sh" ]