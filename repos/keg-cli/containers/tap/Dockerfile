# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG KEG_NODE_VERSION
ARG TAP_IMAGE_FROM=node:$KEG_NODE_VERSION
ARG BASE_IMAGE_FROM=${BASE_IMAGE_FROM:-docker.pkg.github.com/simpleviewinc/keg-packages/keg-base:development}
FROM $BASE_IMAGE_FROM as keg-builder

# ------- Tap Build Stage ------- #

# Use a multi stage build for security
FROM $TAP_IMAGE_FROM as tap-builder
WORKDIR /

# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME $KEG_DOCKER_IP

# Path of the keg cli within the docker container
ARG DOC_CLI_PATH=/keg/keg-cli

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/tap

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn
# Copy over keg-cli repo from keg-builder
COPY --from=keg-builder /keg-hub/repos/keg-cli /keg/keg-cli

# Copy over the local keg-core repo to a temp dir
# Copy over the package.json, and yarn.lock files
COPY package.json $DOC_APP_PATH/
COPY *.lock $DOC_APP_PATH/

# Install the dependecies with yarn install, then remove the .npmrc
RUN apk add --no-cache git bash sudo; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd; \
    cd $DOC_APP_PATH; \
    yarn install; \
    yarn cache clean

# Copy over keg-core repo from keg-builder AFTER running yarn install
COPY --from=keg-builder /keg-hub/repos/keg-core /keg/tap/node_modules/keg-core

# Set the current directory to tap repo
WORKDIR /keg/tap

SHELL [ "/bin/bash" ]

# Run the start script
CMD [ "/bin/bash", "/keg/keg-cli/containers/tap/run.sh" ]
