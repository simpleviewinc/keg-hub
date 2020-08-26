#!/usr/bin/env

# Prints a message to the terminal through stderr
keg_message(){
  echo "[ KEG CLI ] $@" >&2
  return
}

# Prints a message to the terminal through stderr
keg_error(){
  echo ""
  echo "[ KEG ERROR ] $@" >&2
  echo ""
  return
}


# Asks a question in the terminal
keg_ask_question(){
  keg_message "$1"
  read -p "" INPUT;
  local ANSWER="${INPUT:0:1}"

  echo "$ANSWER"
}

# Clean the docker environment
keg_docker_clean(){
  if [[ -z "$1" ]]; then
    keg_message "Cleaning docker environment..."
  fi

  docker system prune -a -f --volumes
}

# Destroys the docker environment
keg_destroy_all_docker(){

  keg_message "Destroying docker environment..."

  docker stop $(docker ps -aq) 2>/dev/null
  docker rm $(docker ps -aq) 2>/dev/null
  keg_docker_clean "NO_LOG"

}
