FROM kegbase:latest

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


# Copy over the package.json, and yarn.lock files
COPY package.json $DOC_APP_PATH/package.json
COPY yarn.lock $DOC_APP_PATH/yarn.lock

# Install the dependecies
RUN cd $DOC_APP_PATH; yarn install --frozen-lockfile --no-cache
RUN cd $DOC_APP_PATH; yarn global add ansi-html html-entities loglevel

EXPOSE 80

# Run the script
CMD [ "/bin/bash", "/keg/keg-cli/containers/core/run.sh" ]