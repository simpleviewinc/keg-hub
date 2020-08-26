# Keg CLI
* Commands for running taps, and other keg related tasks

## Setup
* Follow the instructions for installing and validating the keg cli

### Install
* Create a folder named `keg` at `~/keg`
  * `mkdir -p ~/keg`
* Navigate to `keg` directory
  * `cd ~/keg`
* Git clone the [keg-cli](https://github.com/simpleviewinc/keg-cli.git) repo locally to `~/keg/keg-cli`
  * `git clone https://github.com/simpleviewinc/keg-cli.git ~/keg/keg-cli`
* Run the bash setup script
  * `bash keg-cli/scripts/setup/mac-init.sh`
* It should print `[ KEG CLI ] Keg CLI setup complete!`
  * This message may still print even it an error was thrown
    * Be sure to check the log output
* Run the keg global setup task in the terminal
  * `keg global setup`
    * This task will setup up the keg-cli on the local machine
    * It will ask a few questions, so please pay attention

### Validate
* Run the key global validate task in the terminal
  * `keg global validate`
    * This task should validate the install
    * If a problem is found it will try to fix it
    * If the problem can not be fixed, it will let you know
