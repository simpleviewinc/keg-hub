#!/bin/sh

# Install / Build jsutils
if [ -d "/keg-hub/repos/jsutils" ]; then
  cd /keg-hub/repos/jsutils
  yarn install --pure-lockfile
  yarn build
fi

# Install keg-cli, then copy over it's keg dependencies
if [ -d "/keg-hub/repos/keg-cli" ]; then
  cd /keg-hub/repos/keg-cli
  yarn install --pure-lockfile
  if [ -d "/keg-hub/repos/keg-cli/node_modules/@keg-hub/jsutils/build" ]; then
    rm -rf /keg-hub/repos/keg-cli/node_modules/@keg-hub/jsutils/build
    cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/keg-cli/node_modules/@keg-hub/jsutils/build
  fi
  if [ -d "/keg-hub/repos/keg-cli/node_modules/@keg-hub/args-parse" ]; then
    rm -rf /keg-hub/repos/keg-cli/node_modules/@keg-hub/args-parse
    cp -R /keg-hub/repos/args-parse /keg-hub/repos/keg-cli/node_modules/@keg-hub/args-parse
  fi
  if [ -d "/keg-hub/repos/keg-cli/node_modules/@keg-hub/ask-it" ]; then
    rm -rf /keg-hub/repos/keg-cli/node_modules/@keg-hub/ask-it
    cp -R /keg-hub/repos/ask-it /keg-hub/repos/keg-cli/node_modules/@keg-hub/ask-it
  fi
  if [ -d "/keg-hub/repos/keg-cli/node_modules/@keg-hub/spawn-cmd" ]; then
    rm -rf /keg-hub/repos/keg-cli/node_modules/@keg-hub/spawn-cmd
    cp -R /keg-hub/repos/spawn-cmd /keg-hub/repos/keg-cli/node_modules/@keg-hub/spawn-cmd
  fi
fi

# Install tap-resolver, then copy over it's keg dependencies
if [ -d "/keg-hub/repos/tap-resolver" ]; then
  cd /keg-hub/repos/tap-resolver
  yarn install --pure-lockfile
  if [ -d "/keg-hub/repos/tap-resolver/node_modules/@keg-hub/jsutils/build" ]; then
    rm -rf /keg-hub/repos/tap-resolver/node_modules/@keg-hub/jsutils/build
    cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/tap-resolver/node_modules/@keg-hub/jsutils/build
  fi
fi

# Install / Build re-theme, then copy over it's keg dependencies
if [ -d "/keg-hub/repos/re-theme" ]; then
  cd /keg-hub/repos/re-theme
  yarn install --pure-lockfile
  if [ -d "/keg-hub/repos/re-theme/node_modules/@keg-hub/jsutils/build" ]; then
    rm -rf /keg-hub/repos/re-theme/node_modules/@keg-hub/jsutils/build
    cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/re-theme/node_modules/@keg-hub/jsutils/build
  fi
  yarn build
fi

# Install / Build keg-components, then copy over it's keg dependencies
if [ -d "/keg-hub/repos/keg-components" ]; then
  cd /keg-hub/repos/keg-components
  yarn install --pure-lockfile
  if [ -d "/keg-hub/repos/keg-components/node_modules/@keg-hub/jsutils/build" ]; then
    rm -rf /keg-hub/repos/keg-components/node_modules/@keg-hub/jsutils/build
    cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/keg-components/node_modules/@keg-hub/jsutils/build
  fi
  if [ -d "/keg-hub/repos/keg-components/node_modules/@keg-hub/re-theme/build" ]; then
    rm -rf /keg-hub/repos/keg-components/node_modules/@keg-hub/re-theme/build
    cp -R /keg-hub/repos/re-theme/build /keg-hub/repos/keg-components/node_modules/@keg-hub/re-theme/build
  fi
  yarn build
fi

# Install keg-core, then copy over it's keg dependencies
if [ -d "/keg-hub/repos/keg-core" ]; then
  cd /keg-hub/repos/keg-core
  yarn install --pure-lockfile
  if [ -d "/keg-hub/repos/keg-core/node_modules/@keg-hub/jsutils/build" ]; then
    rm -rf /keg-hub/repos/keg-core/node_modules/@keg-hub/jsutils/build
    cp -R /keg-hub/repos/jsutils/build /keg-hub/repos/keg-core/node_modules/@keg-hub/jsutils/build
  fi
  if [ -d "/keg-hub/repos/keg-core/node_modules/@keg-hub/re-theme/build" ]; then
    rm -rf /keg-hub/repos/keg-core/node_modules/@keg-hub/re-theme/build
    cp -R /keg-hub/repos/re-theme/build /keg-hub/repos/keg-core/node_modules/@keg-hub/re-theme/build
  fi
  if [ -d "/keg-hub/repos/keg-core/node_modules/@keg-hub/keg-components/build" ]; then
    rm -rf /keg-hub/repos/keg-core/node_modules/@keg-hub/keg-components/build
    cp -R /keg-hub/repos/keg-components/build /keg-hub/repos/keg-core/node_modules/@keg-hub/keg-components/build
  fi
fi
