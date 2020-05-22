FROM kegbase:latest

WORKDIR /keg

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

EXPOSE 80

# Run the script
CMD [ "/bin/bash", "/keg/keg-cli/containers/tap/run.sh" ]
