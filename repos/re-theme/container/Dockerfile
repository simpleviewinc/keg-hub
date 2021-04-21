# Path of the tap within the docker container
ARG DOC_APP_PATH

# Setup the taps image FROM in the global state
# Must come before the FROM directive to is can be accessed
ARG KEG_NODE_VERSION
ARG NODE_IMAGE_FROM=node:$KEG_NODE_VERSION

# Add a FROM for the tap-base image to we can copy content from it
ARG KEG_BASE_IMAGE=ghcr.io/simpleviewinc/tap:develop
FROM $KEG_BASE_IMAGE as tap-base

# Get the git keg-hub url and branch to pull down
ARG GIT_HUB_URL=https://github.com/simpleviewinc/keg-hub.git
ARG GIT_HUB_BRANCH=develop

ENV DOC_APP_PATH=$DOC_APP_PATH

# Set the current directory to tap repo
WORKDIR $DOC_APP_PATH

# Pull down the keg-hub repo from github
# Because retheme is inside keg-hub, clone keg-hub
# Then copy over retheme to the correct directory
# Install all deps, and copy jsutils from keg-core to get the up-to-date verison
# Finally remove the keg-hub repos
RUN git clone --single-branch --branch $GIT_HUB_BRANCH $GIT_HUB_URL /keg-hub-clone; \
    cp -R /keg-hub-clone/repos/re-theme/. $DOC_APP_PATH/; \
    rm -rf /keg-hub-clone; \
    cd $DOC_APP_PATH; \
    yarn install --pure-lockfile; \
    yarn cache clean; \
    cp -R /keg-hub/repos/keg-core/node_modules/@keg-hub/jsutils/build/. $DOC_APP_PATH/node_modules/@keg-hub/jsutils/build/; \
    rm -rf /keg-hub

EXPOSE $KEG_PROXY_PORT

# Run the start script
CMD [ "/bin/bash", "container/run.sh" ]
