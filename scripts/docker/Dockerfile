FROM node:12.15.0

RUN apt-get install git openssh-client

WORKDIR /keg/tap

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN touch start.sh
RUN ls -la >> start.sh

# COPY package.json /keg/tap/package.json
# COPY yarn.lock /keg/tap/yarn.lock
# RUN yarn install
# To run the keg without a tap
# docker run --rm -it \
# -v $PWD/:/keg/keg-core \
# -v $PWD/package.json:/keg/keg-core/package.json \
# keg-core:local /bin/bash

CMD [ "/bin/bash", "start.sh" ]