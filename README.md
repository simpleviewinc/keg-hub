# Keg CLI
Commands for running the Keg

### Setup

* Download the repo

  * Add to your path
  ```bash
    // Clone repo
    git clone https://github.com/lancetipton/Keg-CLI.git
    export PATH="<path/to/repo/keg>$PATH"
    // Then from your command line
    keg run
  ```

  * Or add to package.json or your project
  ```json
    {
      "scripts": {
        "keg": "node_modules/keg-cli/keg",
      },
      "dependencies": {
        "keg-cli": "git+https://github.com/lancetipton/keg-cli.git",
      },
    }
  ```
  ```bash
    // Then run keg commands with npm || yarn
    yarn keg ...command
    npm run keg ...command
  ```