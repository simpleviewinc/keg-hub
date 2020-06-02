FROM node:12.15.0

RUN apt-get install git openssh-client
WORKDIR /keg

# Install the expo-cli globaly to it can be accessed from any where
RUN yarn global add expo-cli

# Add the GIT_KEY arg, and set value to initial
# This expects --build-arg GIT_KEY=key_value to be set
# Which will override the default initial value, and allow updating git
ARG GIT_KEY=INITIAL

# Update git calls to github to include the key so private repos can be pulled
RUN if [ "$GIT_KEY" != "INITIAL" ]; then \
      git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    fi

# --- Install the keg-cli from git --- #

# Add the GIT_CLI_URL arg, and set value to initial
# This expects --build-arg GIT_CLI_URL=key_value to be set
# URL of the tap to clone from github
ARG GIT_CLI_URL=INITIAL

# Pull down the cli locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_CLI_URL" != "INITIAL" ]; then \
      git clone $GIT_CLI_URL $DOC_CLI_PATH; \
    fi


# --- Install keg-core from git --- #

# Add the GIT_CORE_URL arg, and set value to initial
# This expects --build-arg GIT_CORE_URL=key_value to be set
# URL of the keg-core to clone from github
ARG GIT_CORE_URL=INITIAL

ARG DOC_CORE_PATH=/keg/keg-core

# Pull down the cli locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_CORE_URL" != "INITIAL" ]; then \
      git clone $GIT_CORE_URL $DOC_CORE_PATH; \
    fi


# --- Install keg-components from git --- #

# Add the GIT_COMPONENTS_URL arg, and set value to initial
# This expects --build-arg GIT_COMPONENTS_URL=key_value to be set
# URL of the keg-components to clone from github
ARG GIT_COMPONENTS_URL=INITIAL

ARG DOC_COMPONENTS_PATH=/keg/keg-components

# Pull down the cli locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_COMPONENTS_URL" != "INITIAL" ]; then \
      git clone $GIT_COMPONENTS_URL $DOC_COMPONENTS_PATH; \
    fi


# --- Install re-theme from git --- #

# Add the GIT_COMPONENTS_URL arg, and set value to initial
# This expects --build-arg GIT_COMPONENTS_URL=key_value to be set
# URL of the keg-components to clone from github
ARG GIT_RETHEME_URL=INITIAL

ARG DOC_RETHEME_PATH=/keg/re-theme

# Pull down the cli locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_RETHEME_URL" != "INITIAL" ]; then \
      git clone $GIT_RETHEME_URL $DOC_RETHEME_PATH; \
    fi

# --- Install tap-resolver from git --- #

# Add the GIT_COMPONENTS_URL arg, and set value to initial
# This expects --build-arg GIT_COMPONENTS_URL=key_value to be set
# URL of the tap-resolver to clone from github
ARG GIT_RESOLVER_URL=INITIAL

ARG DOC_RESOLVER_PATH=/keg/tap-resolver

# Pull down the cli locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_RESOLVER_URL" != "INITIAL" ]; then \
      git clone $GIT_RESOLVER_URL $DOC_RESOLVER_PATH; \
    fi

# Expose the container ports to allow connecting to it externally
EXPOSE 873
EXPOSE 8080
EXPOSE 8081
EXPOSE 8082
EXPOSE 19006
EXPOSE 19002
EXPOSE 60710
EXPOSE 80
