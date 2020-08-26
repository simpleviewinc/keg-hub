FROM nginx:latest

RUN apt-get update
RUN apt-get install nano

WORKDIR /keg

# Add the GIT_KEY arg, and set value to initial
# This expects --build-arg GIT_KEY=key_value to be set
# Which will override the default initial value, and allow updating git
ARG GIT_KEY=INITIAL

# Update git calls to github to include the key so private repos can be pulled
RUN if [ "$GIT_KEY" != "INITIAL" ]; then \
      git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    fi

# Add the GIT_PROXY_URL arg, and set value to initial
# This expects --build-arg GIT_PROXY_URL=key_value to be set
# URL of the prxoy to clone from github
ARG GIT_PROXY_URL=INITIAL

# Pull down the tap locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_PROXY_URL" != "INITIAL" ]; then \
      git clone $GIT_PROXY_URL ./proxy; \
      cp ./proxy/src/config/nginx.conf /etc/nginx/nginx.conf; \
    fi

# Add the FROM_LOCAL arg, and set value to initial
# This expects --build-arg FROM_LOCAL=key_value to be set
# Valie can be anything, it just needs to be set
ARG FROM_LOCAL=INITIAL

# Copy the local proxy src folder into the container
COPY src ./proxy-local/src

# Check if we should overwrite git repo data with the local data
RUN if [ "$FROM_LOCAL" != "INITIAL" ] then \
      mkdir -p ./proxy; \
      rm -rf ./proxy/src; \
      cp ./proxy-local/src ./proxy/src; \
      cp ./proxy/src/config/nginx.conf /etc/nginx/nginx.conf; \
    fi

# Add the GIT_LETS_ENCRYPT_URL arg, and set value to initial
# This expects --build-arg GIT_LETS_ENCRYPT_URL=key_value to be set
# URL of the lets encrypt repo to clone from github
ARG GIT_LETS_ENCRYPT_URL=INITIAL

# Pull down the sv lets-encrypt locally
# Then copy over the certs
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_LETS_ENCRYPT_URL" != "INITIAL" ]; then \
      git clone $GIT_LETS_ENCRYPT_URL ./svle; \
      cp ./svle/src/certs/keg.pem ./proxy/src/certs/keg.pem; \
      cp ./svle/src/certs/keg.key ./proxy/src/certs/keg.key; \
    fi

# Add yarn's global bin to path
# RUN echo "export PATH=$PATH:/usr/local/share/.config/yarn/global/node_modules/.bin" >> /root/.ashrc
# Tell the shell to load the shell profile