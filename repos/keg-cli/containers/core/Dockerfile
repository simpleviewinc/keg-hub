# Allows overwriting where the base image is pulled from
# Must come before the FROM directive
ARG KEG_NODE_VERSION
ARG NODE_IMAGE_FROM=node:$KEG_NODE_VERSION
ARG KEG_BASE_IMAGE=docker.pkg.github.com/simpleviewinc/keg-packages/keg-base:develop
FROM $KEG_BASE_IMAGE as keg-builder

# ------- Core Build Stage ------- #

# Use a multi stage build for security
FROM $NODE_IMAGE_FROM as core-builder

# Path of the app within the docker container
ARG DOC_APP_PATH=/keg/keg-core
ENV DOC_APP_PATH=$DOC_APP_PATH

# Set the current directory to keg-core repo
WORKDIR $DOC_APP_PATH

# Add yarn's global bin to PATH
ENV PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin

# Copy over the globally installed modules from above
COPY --from=keg-builder /usr/local/share/.config/yarn /usr/local/share/.config/yarn

# Install the dependecies with yarn install
RUN apk add --no-cache git bash sudo; \
    echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf; \
    sudo sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd

# Copy over keg-hub node_modules from keg-builder AFTER running yarn install
COPY --from=keg-builder /keg-hub/repos/keg-cli/containers/core/run.sh /keg/core-run.sh
COPY --from=keg-builder /keg-hub/repos/keg-core/node_modules $DOC_APP_PATH/node_modules

# Update the permissions of the run script
RUN chmod a+x /keg/core-run.sh

SHELL [ "/bin/bash" ]

# Run the start script
CMD [ "/bin/bash", "/keg/core-run.sh" ]

