# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG KEG_NODE_VERSION
ARG TAP_IMAGE_FROM=node:$KEG_NODE_VERSION
ARG KEG_IMAGE_FROM
FROM $KEG_IMAGE_FROM as builder

# FROM docker.pkg.github.com/simpleviewinc/keg-packages/tap:latest as builder

# ------- New Build Stage ------- #

# Use a multi stage build for security
FROM $TAP_IMAGE_FROM as tapBuilder
WORKDIR /

# Install git for the new stage
RUN apk add --no-cache git bash sudo; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    git config --global url.https://$PUBLIC_GIT_KEY@github.com/.insteadOf https://github.com/; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd

# Path of the keg cli within the docker container
ARG DOC_CLI_PATH=/keg/keg-cli

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/tap

# Get the ip of docker-machine from the ARG, so we can set it as an ENV
ARG KEG_DOCKER_IP

# Used by react native builder to set the ip address, other wise 
# Will use the ip address of the docker container.
ENV REACT_NATIVE_PACKAGER_HOSTNAME $KEG_DOCKER_IP

# Copy over the globally installed modules from above
COPY --from=builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn
# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Copy over keg cli from keg-base
COPY --from=builder /keg /keg

# Set the current directory to tap repo
WORKDIR /$DOC_APP_PATH

SHELL [ "/bin/bash" ]

# Run the start script
CMD [ "/bin/bash", "/keg/keg-cli/containers/tap/run.sh" ]
