ARG KEG_NODE_VERSION
ARG BASE_IMAGE_FROM=node:$KEG_NODE_VERSION
FROM $BASE_IMAGE_FROM as keg-builder

WORKDIR /

# Set the default expojs version to it's locked down
ARG EXPO_CLI_VERSION=3.28.5

# Pull down dependencies should be used, and setup them up
RUN apk add --no-cache git; \
    yarn global add expo-cli@$EXPO_CLI_VERSION nodemon

# Copy over the local keg-core repo to a temp dir
COPY . /keg-temp/

# Should we use the local copy of the keg-core repo when building
ARG KEG_COPY_LOCAL

# Get the git keg-hub url and branch to pull down
ARG GIT_HUB_URL=https://github.com/simpleviewinc/keg-hub.git
ARG GIT_HUB_BRANCH=develop

# Pull down the latest from  git hub it the
RUN if [ -z "$KEG_COPY_LOCAL" ]; then \
      git clone --single-branch --branch $GIT_HUB_BRANCH $GIT_HUB_URL /keg-hub; \
    else \
      mkdir -p /keg-hub; \
      cp -R /keg-temp/* /keg-hub; \
      rm -rf /keg-temp; \
    fi

# Install / Build jsutils
RUN if [ -d "/keg-hub/repos/jsutils" ]; then \
      cd /keg-hub/repos/jsutils; \
      yarn install; \
      yarn build; \
    fi

# Install keg-cli, then copy over it's keg dependencies
RUN if [ -d "/keg-hub/repos/keg-cli" ]; then \
      cd /keg-hub/repos/keg-cli; \
      yarn install; \
      if [ -d "/keg-hub/repos/keg-cli/node_modules/@keg-hub/jsutils/build" ]; then \
        rm -rf /keg-hub/repos/keg-cli/node_modules/@keg-hub/jsutils/build; \
        cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/keg-cli/node_modules/@keg-hub/jsutils/build; \
      fi; \
      if [ -d "/keg-hub/repos/keg-cli/node_modules/@keg-hub/args-parse" ]; then \
        rm -rf /keg-hub/repos/keg-cli/node_modules/@keg-hub/args-parse; \
        cp -R /keg-hub/repos/args-parse /keg-hub/repos/keg-cli/node_modules/@keg-hub/args-parse; \
      fi; \
      if [ -d "/keg-hub/repos/keg-cli/node_modules/@keg-hub/ask-it" ]; then \
        rm -rf /keg-hub/repos/keg-cli/node_modules/@keg-hub/ask-it; \
        cp -R /keg-hub/repos/ask-it /keg-hub/repos/keg-cli/node_modules/@keg-hub/ask-it; \
      fi; \
      if [ -d "/keg-hub/repos/keg-cli/node_modules/@keg-hub/spawn-cmd" ]; then \
        rm -rf /keg-hub/repos/keg-cli/node_modules/@keg-hub/spawn-cmd; \
        cp -R /keg-hub/repos/spawn-cmd /keg-hub/repos/keg-cli/node_modules/@keg-hub/spawn-cmd; \
      fi; \
    fi

# Install tap-resolver, then copy over it's keg dependencies
RUN if [ -d "/keg-hub/repos/tap-resolver" ]; then \
      cd /keg-hub/repos/tap-resolver; \
      yarn install; \
      if [ -d "/keg-hub/repos/tap-resolver/node_modules/@keg-hub/jsutils/build" ]; then \
        rm -rf /keg-hub/repos/tap-resolver/node_modules/@keg-hub/jsutils/build; \
        cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/tap-resolver/node_modules/@keg-hub/jsutils/build; \
      fi; \
    fi

# Install / Build re-theme, then copy over it's keg dependencies
RUN if [ -d "/keg-hub/repos/re-theme" ]; then \
      cd /keg-hub/repos/re-theme; \
      yarn install; \
      if [ -d "/keg-hub/repos/re-theme/node_modules/@keg-hub/jsutils/build" ]; then \
        rm -rf /keg-hub/repos/re-theme/node_modules/@keg-hub/jsutils/build; \
        cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/re-theme/node_modules/@keg-hub/jsutils/build; \
      fi; \
      yarn build; \
    fi

# Install / Build keg-components, then copy over it's keg dependencies
RUN if [ -d "/keg-hub/repos/keg-components" ]; then \
      cd /keg-hub/repos/keg-components; \
      yarn install; \
      if [ -d "/keg-hub/repos/keg-components/node_modules/@keg-hub/jsutils/build" ]; then \
        rm -rf /keg-hub/repos/keg-components/node_modules/@keg-hub/jsutils/build; \
        cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/keg-components/node_modules/@keg-hub/jsutils/build; \
      fi; \
      if [ -d "/keg-hub/repos/keg-components/node_modules/@keg-hub/re-theme/build" ]; then \
        rm -rf /keg-hub/repos/keg-components/node_modules/@keg-hub/re-theme/build; \
        cp -R /keg-hub/repos/re-theme/build /keg-hub/repos/keg-components/node_modules/@keg-hub/re-theme/build; \
      fi; \
      yarn build; \
    fi

# Install keg-core, then copy over it's keg dependencies
RUN if [ -d "/keg-hub/repos/keg-core" ]; then \
      cd /keg-hub/repos/keg-core; \
      yarn install; \
      if [ -d "/keg-hub/repos/keg-core/node_modules/@keg-hub/jsutils/build" ]; then \
        rm -rf /keg-hub/repos/keg-core/node_modules/@keg-hub/jsutils/build; \
        cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/keg-core/node_modules/@keg-hub/jsutils/build; \
      fi; \
      if [ -d "/keg-hub/repos/keg-core/node_modules/@keg-hub/re-theme/build" ]; then \
        rm -rf /keg-hub/repos/keg-core/node_modules/@keg-hub/re-theme/build; \
        cp -R /keg-hub/repos/re-theme/build /keg-hub/repos/keg-core/node_modules/@keg-hub/re-theme/build; \
      fi; \
      if [ -d "/keg-hub/repos/keg-core/node_modules/@keg-hub/keg-components/build" ]; then \
        rm -rf /keg-hub/repos/keg-core/node_modules/@keg-hub/keg-components/build; \
        cp -R /keg-hub/repos/keg-components/build /keg-hub/repos/keg-core/node_modules/@keg-hub/keg-components/build; \
      fi; \
    fi

# ------- Final Build Stage ------- #

# Use a multi stage build for security
FROM $BASE_IMAGE_FROM AS final-build

WORKDIR /

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP=0.0.0.0

# Used by react native to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME $KEG_DOCKER_IP

# Install git and bash for the new stage
# This is so Dockerfiles that uses "FROM keg-base", don't have to install these packages
RUN apk add --no-cache bash git; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd; \
    yarn cache clean

# Copy over the globally installed modules from above
COPY --from=keg-builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn

# Copy over keg hub from keg-builder build stage
COPY --from=keg-builder /keg-hub /keg-hub

WORKDIR /keg-hub

# Set the defualt shell to bash
SHELL [ "/bin/bash" ]

# Run the bash for the default command
CMD [ "/bin/bash" ]