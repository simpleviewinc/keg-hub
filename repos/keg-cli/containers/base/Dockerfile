ARG KEG_NODE_VERSION
ARG KEG_NODE_IMAGE=node:$KEG_NODE_VERSION
FROM $KEG_NODE_IMAGE as keg-builder

WORKDIR /

# Pull down dependencies should be used, and setup them up
RUN apk add git

# Set the default expojs version to it's locked down
ARG EXPO_CLI_VERSION=3.28.5
RUN yarn global add expo-cli@$EXPO_CLI_VERSION nodemon --pure-lockfile

# Get the git keg-hub url and branch to pull down
ARG GIT_HUB_URL=https://github.com/simpleviewinc/keg-hub.git
ARG GIT_HUB_BRANCH=develop

# Pull down the from github if KEG_COPY_LOCAL is not set
RUN git clone --single-branch --branch $GIT_HUB_BRANCH $GIT_HUB_URL /keg-hub

# Copy over the local keg-core repo to a temp dir
COPY ./repos/keg-cli/containers/base/build.sh /keg-temp/build.sh

# Make the build file executable
RUN chmod +x /keg-temp/build.sh

# Run the build file
RUN /keg-temp/build.sh

# ------- Final Build Stage ------- #

# Use a multi stage build for security
FROM $KEG_NODE_IMAGE AS final-build

WORKDIR /

# Add the keg-exec folder to the path, so we can find our keg-cli exec script
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin:/keg-temp/keg-exec

# Install git, docker-cli and bash for the new stage
RUN apk add git docker-cli bash; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd; \
    mkdir -p /root/.kegConfig; \
    mkdir -p /keg-temp/keg-exec

# Copy over the globally installed modules from above
COPY --from=keg-builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn

# Copy over keg hub from keg-builder build stage
COPY --from=keg-builder /keg-hub /keg-hub

# Copy over keg cli base container from local
COPY ./repos/keg-cli/containers/base /keg-hub/repos/keg-cli/containers/base

# Copy over the keg-exec script nad update the permissions so we can execute it
RUN cp /keg-hub/repos/keg-cli/containers/base/cli.config.json /root/.kegConfig/cli.config.json; \
    cp /keg-hub/repos/keg-cli/containers/base/keg-exec.sh /keg-temp/keg-exec/keg; \
    chmod +x /keg-temp/keg-exec/keg

WORKDIR /keg-hub

# Set the defualt shell to bash
SHELL [ "/bin/bash"]

# Run the bash for the default command
CMD [ "/bin/bash" ]