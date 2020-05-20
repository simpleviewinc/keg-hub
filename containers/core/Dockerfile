FROM kegbase:latest

WORKDIR /keg/tap/node_modules

# Add the GIT_CORE_URL arg, and set value to initial
# This expects --build-arg GIT_CORE_URL=key_value to be set
# URL of the keg-core to clone from github
ARG GIT_CORE_URL=INITIAL

# Pull down the tap locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_CORE_URL" != "INITIAL" ]; then \
      git clone $GIT_CORE_URL ./keg-core; \
      cd ./keg-core; \
      yarn install; \
    fi

# Run the script
CMD [ "/bin/bash", "/keg/cli/containers/core/run.sh" ]