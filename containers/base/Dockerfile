FROM node:12.8-buster-slim

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME="10.0.0.2"
ARG EXPO_CLI_VERSION="3.21.3"

WORKDIR /keg

# Install our apt depenencies and expo-cli
RUN apt update && apt install -y \
    git \
    procps; \
    yarn global add expo-cli@$EXPO_CLI_VERSION

# Add the GIT_KEY arg, and set value to initial
# This expects --build-arg GIT_KEY=key_value to be set
# Which will override the default initial value, and allow updating git
ARG GIT_KEY=INITIAL

# Update git calls to github to include the key so private repos can be pulled
RUN if [ "$GIT_KEY" != "INITIAL" ]; then \
      git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    fi

# Add the GIT_CLI_URL arg, and set value to initial
# This expects --build-arg GIT_CLI_URL=key_value to be set
# URL of the tap to clone from github
ARG GIT_CLI_URL=INITIAL

# Pull down the cli locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_CLI_URL" != "INITIAL" ]; then \
      git clone $GIT_CLI_URL $DOC_CLI_PATH; \
    fi

# Expose the container ports to allow connecting to it externally
EXPOSE 80
EXPOSE 873
EXPOSE 8080
EXPOSE 8081
EXPOSE 8082
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006
EXPOSE 60710
