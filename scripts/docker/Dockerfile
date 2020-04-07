FROM node:12.15.0

RUN apt-get install git openssh-client
WORKDIR /keg

# Add the GIT_KEY arg, and set value to invalid
# This expects --build-arg GIT_KEY=key_value to be set
# Which will override the default invalid value, and allow updating git
ARG GIT_KEY=INVALID

# Add the GIT_TAP_URL arg, and set value to invalid
# This expects --build-arg GIT_TAP_URL=key_value to be set
# URL of the tap to clone from github
ARG GIT_TAP_URL=INVALID

# Update git calls to github to include the key so private repos can be pulled
RUN git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/

# Pull down the tap locally
RUN git clone $GIT_TAP_URL ./tap

# Navigate to the taps directory
WORKDIR /keg/tap

# Install the expo-cli globaly to it can be accessed from any where
RUN yarn global add expo-cli

# Copy over the package.json, and yarn.lock files
COPY package.json /keg/tap/package.json
COPY yarn.lock /keg/tap/yarn.lock

# Install the dependecies
RUN yarn setup

# Run 
CMD [ "yarn", "web" ]