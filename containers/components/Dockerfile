# Allows overwriting where the base image is pulled from
ARG IMAGE_FROM=kegbase:latest
FROM $IMAGE_FROM

WORKDIR /keg

# Add the GIT_KEY arg, and set value to initial
# This expects --build-arg GIT_KEY=key_value to be set
# Which will override the default initial value, and allow updating git
ARG GIT_KEY=INITIAL

# Add the GIT_COMPONENTS_URL arg, and set value to initial
# This expects --build-arg GIT_COMPONENTS_URL=key_value to be set
# URL of the tap to clone from github
ARG GIT_COMPONENTS_URL=INITIAL

# Pull down the tap locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_COMPONENTS_URL" != "INITIAL" ]; then \
      git clone $GIT_COMPONENTS_URL $DOC_APP_PATH; \
    fi

# Navigate to the taps directory
WORKDIR $DOC_APP_PATH

# Copy over the package.json, and yarn.lock files
COPY package.json $DOC_APP_PATH/package.json
COPY yarn.lock $DOC_APP_PATH/yarn.lock

# Install the dependecies
RUN yarn install

EXPOSE 80

# Run the script
CMD [ "/bin/bash", "/keg/keg-cli/containers/components/run.sh" ]
