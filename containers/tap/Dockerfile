FROM kegcore:0.0.1

WORKDIR /keg

# Add the GIT_KEY arg, and set value to initial
# This expects --build-arg GIT_KEY=key_value to be set
# Which will override the default initial value, and allow updating git
ARG GIT_KEY=INITIAL

# Add the GIT_TAP_URL arg, and set value to initial
# This expects --build-arg GIT_TAP_URL=key_value to be set
# URL of the tap to clone from github
ARG GIT_TAP_URL=INITIAL

# Pull down the tap locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_TAP_URL" != "INITIAL" ]; then \
      git clone $GIT_TAP_URL ./tap; \
    fi

# Navigate to the taps directory
WORKDIR /keg/tap

# Copy over the package.json, and yarn.lock files
COPY package.json /keg/tap/package.json
COPY yarn.lock /keg/tap/yarn.lock

# Install the dependecies
RUN yarn setup

# Run the script
CMD [ "/bin/bash", "/keg/cli/containers/tap/run.sh" ]
