FROM node:12

WORKDIR /keg-test

ADD yarn.lock .
ADD package.json .
RUN yarn
ADD . .

ENTRYPOINT ["yarn"]
CMD ["test:grid"]
