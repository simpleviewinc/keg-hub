FROM node:12.15.0

COPY package.json /keg/package.json
RUN cd /keg && yarn install

WORKDIR /keg/keg-core

# To run the keg without a tap
# docker run --rm -it \
# -v $PWD/:/keg/keg-core \
# -v $PWD/package.json:/keg/keg-core/package.json \
# -p 10000:10000 \
# keg-core:local /bin/bash
