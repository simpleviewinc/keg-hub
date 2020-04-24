FROM keg:base:v1

RUN apt-get install git openssh-client
WORKDIR /keg

# Install the expo-cli globaly to it can be accessed from any where
RUN yarn global add expo-cli

# Add the GIT_KEY arg, and set value to initial
# This expects --build-arg GIT_KEY=key_value to be set
# Which will override the default initial value, and allow updating git
ARG GIT_KEY=INITIAL

# Add the GIT_TAP_URL arg, and set value to initial
# This expects --build-arg GIT_TAP_URL=key_value to be set
# URL of the tap to clone from github
ARG GIT_TAP_URL=INITIAL

# Add the GIT_CLI_URL arg, and set value to initial
# This expects --build-arg GIT_CLI_URL=key_value to be set
# URL of the tap to clone from github
ARG GIT_CLI_URL=INITIAL

# Update git calls to github to include the key so private repos can be pulled
RUN if [ "$GIT_KEY" != "INITIAL" ]; then \
      git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    fi

# Pull down the tap locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_TAP_URL" != "INITIAL" ]; then \
      git clone $GIT_TAP_URL ./tap; \
    fi

# Pull down the cli locallay
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_CLI_URL" != "INITIAL" ]; then \
      git clone $GIT_CLI_URL ./cli; \
    fi

# Navigate to the taps directory
WORKDIR /keg/tap

# Copy over the package.json, and yarn.lock files
COPY package.json /keg/tap/package.json
COPY yarn.lock /keg/tap/yarn.lock

# Install the dependecies
RUN yarn setup

# Expose the container ports to allow connecting to it externally
EXPOSE 873
EXPOSE 19006
EXPOSE 19002

# Switch to the cli directory, to run the docker run script
WORKDIR /keg/tap

# Run the script
CMD [ "/bin/bash", "/keg/cli/scripts/docker/run.sh" ]
