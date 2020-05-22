FROM kegbase:latest

WORKDIR /keg

# Add the GIT_CORE_URL arg, and set value to initial
# This expects --build-arg GIT_CORE_URL=key_value to be set
# URL of the keg-core to clone from github
ARG GIT_CORE_URL=INITIAL

# Pull down the tap locally
RUN if [ "$GIT_KEY" != "INITIAL" ] && [ "$GIT_CORE_URL" != "INITIAL" ]; then \
      echo "Cloneing keg-core repo from github..."; \
      git clone $GIT_CORE_URL ./tap; \
      cd $DOC_CORE_PATH; \
      yarn install; \
    fi

EXPOSE 80

# Run the script
CMD [ "/bin/bash", "/keg/cli/containers/core/run.sh" ]