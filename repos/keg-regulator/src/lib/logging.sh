#!/bin/bash

# Helper to print a message in a color
cecho(){
  RED="\033[0;31m"
  GREEN="\033[0;32m"
  YELLOW="\033[1;33m"
  # ... ADD MORE COLORS
  NC="\033[0m" # No Color

  printf "${!1}${2} ${NC}\n"
}

# Prints an error in color red to the terminal
keg_error() {
  if [[ $QUIET -ne 1 ]]; then 
    cecho "RED" "[ Keg-Error ] $@" 1>&2;
  fi
}

# Prints an error in color green to the terminal
keg_success() {
  if [[ $QUIET -ne 1 ]]; then 
    cecho "GREEN" "[ Keg-REG ] $@" 1>&2;
  fi
}

# Prints an error in color yellow to the terminal
keg_warn() {
  if [[ $QUIET -ne 1 ]]; then 
    cecho "YELLOW" "[ Keg-REG ] $@" 1>&2;
  fi
}
