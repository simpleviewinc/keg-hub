FROM node:12

WORKDIR /keg/keg-regulator

ADD yarn.lock .
ADD package.json .
RUN yarn install --ignore-engines
ADD . .

WORKDIR /keg/keg-regulator/tests
ADD tests/*.lock .
ADD tests/package.json .
RUN yarn install --ignore-engines

ENTRYPOINT ["yarn"]
CMD ["test:grid"]
