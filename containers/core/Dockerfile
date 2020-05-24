FROM kegbase:latest

WORKDIR /keg

# Add the GIT_CORE_URL arg, and set value to initial
# This expects --build-arg GIT_CORE_URL=key_value to be set
# URL of the keg-core to clone from github
ARG GIT_CORE_URL=INITIAL

# Update git calls to github to include the key so private repos can be pulled
RUN if [ "$GIT_KEY" != "INITIAL" ]; then \
      git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/; \
    fi


# Pull down keg-core locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_CORE_URL" != "INITIAL" ]; then \
      echo "Cloneing keg-core repo from github..."; \
      git clone $GIT_CORE_URL ./$DOC_TAP_PATH; \
      cd $DOC_TAP_PATH; \
      yarn install; \
    fi

EXPOSE 80

# Run the script
CMD [ "/bin/bash", "/keg/keg-cli/containers/core/run.sh" ]