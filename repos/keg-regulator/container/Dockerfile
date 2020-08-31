# Must come before the FROM directive
ARG KEG_IMAGE_FROM=${KEG_IMAGE_FROM:-node:12.13-alpine}

FROM $KEG_IMAGE_FROM

WORKDIR /


# Path of the app within the docker container
ARG DOC_APP_PATH=${DOC_APP_PATH:-/keg/keg-regulator}
ARG NO_VNC_CHROME_PORT=${NO_VNC_CHROME_PORT:-7070}
ARG NO_VNC_FIREFOX_PORT=${NO_VNC_FIREFOX_PORT:-7071}
ARG SELENIUM_VNC

# Set an env so we know where the vnc repo is installed
ENV DOC_NOVNC_PATH=/keg/keg-vnc

# Copy over the local keg-regulator repo to a temp dir
COPY . /keg-temp/

ARG KEG_COPY_LOCAL=$KEG_COPY_LOCAL
ARG GIT_REGULATOR_URL=$GIT_REGULATOR_URL

# Pull down the keg-regulator locally if a git regulator url exists
# Otherwise copy over the local version from keg-temp
RUN mkdir -p /keg; \
    if [ "$KEG_COPY_LOCAL" ] || [ -z "$GIT_REGULATOR_URL"  ]; then \
      cp -R /keg-temp/ $DOC_APP_PATH; \
    else \
      git clone $GIT_REGULATOR_URL $DOC_APP_PATH; \
    fi; \
    rm -rf /keg-temp

# Install and setup deps for NoVNC when running locally
RUN apk add --no-cache git bash; \
    if [ "$SELENIUM_VNC" ]; then \
      apk add --no-cache python3 net-tools curl gcc g++ py3-numpy procps; \
      ln -s /usr/bin/python3 /usr/bin/python; \
      ln -s /usr/bin/pip3 /usr/bin/pip; \
      git clone https://github.com/novnc/noVNC.git $DOC_NOVNC_PATH; \
      git clone https://github.com/kanaka/websockify $DOC_NOVNC_PATH/utils/websockify; \
    fi; \
    cd $DOC_APP_PATH; \
    yarn install --ignore-engines; \
    yarn cache clean

WORKDIR $DOC_APP_PATH

# Expose container ports
EXPOSE 80
EXPOSE 443

COPY run.sh $DOC_APP_PATH/run.sh

# Run the start script passing in sleep
# Dont use the array syntax, so we have access to the DOC_APP_PATH ENV
CMD /bin/bash $DOC_APP_PATH/run.sh "sleep"
