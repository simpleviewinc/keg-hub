# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG IMAGE_FROM=kegbase:latest
FROM $IMAGE_FROM

# TODO: Setup to pull from kegbase image => /usr/local/share/.config/yarn/global
WORKDIR /keg

# Which will override the default initial value, and allow updating git
# Will only clone if GIT_KEY is overridden
ARG GIT_KEY=INITIAL

# URL of the tap to clone from github
# Will only clone if GIT_KEY and GIT_TAP_URL is overridden
ARG GIT_TAP_URL=INITIAL

# Path of the keg cli within the docker container
ARG DOC_CLI_PATH=/keg/keg-cli

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/tap

# Path where node_modules will be installed durring docker built
ARG NM_CACHE=/keg/nm-cache/core

# Update git calls to github to include the key so private repos can be pulled
RUN if [ "$GIT_KEY" != "INITIAL" ]; then \
      git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    fi

# Pull down the tap locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_TAP_URL" != "INITIAL" ]; then \
      git clone $GIT_TAP_URL $DOC_APP_PATH; \
    fi

# Create a fake post install script for after the yarn install
RUN mkdir -p $NM_CACHE/core/scripts/js; \
    touch $NM_CACHE/core/scripts/js/postInstall.js

# Copy over the package.json, and yarn.lock files
COPY package.json $NM_CACHE/package.json
COPY yarn.lock $NM_CACHE/yarn.lock

# Install the dependecies
RUN cd $NM_CACHE; yarn setup

EXPOSE 80

# Run the script
CMD [ "/bin/bash", "$DOC_CLI_PATH/containers/tap/run.sh" ]
