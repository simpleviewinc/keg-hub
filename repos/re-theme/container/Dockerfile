# Path of the tap within the docker container
ARG DOC_APP_PATH

# Setup re-theme image FROM in the global state
# Must come before the FROM directive to is can be accessed
ARG KEG_NODE_VERSION
ARG NODE_IMAGE_FROM=node:$KEG_NODE_VERSION

# Add a FROM for the tap-base image to we can copy content from it
ARG KEG_BASE_IMAGE=ghcr.io/simpleviewinc/tap:develop
FROM $KEG_BASE_IMAGE as tap-base

# Create a new image from the node image
FROM $NODE_IMAGE_FROM as re-theme

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

ARG DOC_APP_PATH
ENV DOC_APP_PATH=$DOC_APP_PATH

# Copy over the re-theme code from the tap image into this image
COPY --from=tap-base $DOC_APP_PATH/repos/re-theme $DOC_APP_PATH

# Set the max-listenrs, and install the dependecies with yarn install
RUN apk add git bash; \
    echo fs.inotify.max_user_watches=1048576 | tee -a /etc/sysctl.conf; \
    sysctl -p; \
    rm -rf /var/cache/apk/*; \
    /bin/sed -i '1s|.*|root:x:0:0:root:/root:/bin/bash|g' /etc/passwd; \
    cd $DOC_APP_PATH; \
    yarn install --pure-lockfile; \
    yarn cache clean; \
    rm -rf $DOC_APP_PATH/node_modules/@keg-hub/jsutils/build

# Copy jsutils/retheme from keg-core to get the up-to-date verison
# Copy over the re-theme code from the tap image into this image
COPY --from=tap-base /keg-hub/repos/keg-core/node_modules/@keg-hub/jsutils/build $DOC_APP_PATH/node_modules/@keg-hub/jsutils/build

ARG KEG_PROXY_PORT=60710
EXPOSE $KEG_PROXY_PORT

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
