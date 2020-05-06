#!/bin/bash

keg_update_local_hosts_file(){

  # Get a list of all running docker machines
  DOCKER_LIST=($(docker-machine ls | grep Running | awk '{ print $1 }'))

  # Loop the docker-machines
  for DOCKER_NAME in "${DOCKER_LIST[@]}"; do

    # Get the ip address for the docker-machine
    DOCKER_IP=$(docker-machine ip $DOCKER_NAME)

    # Remove an existing record from the hosts file
    sudo sed -i '' '/'$DOCKER_IP'/d' /etc/hosts
    
    # Add the ip and host to the hosts file
    sudo sed -i -e '$a\    
    '"$DOCKER_IP"' '"$DOCKER_NAME"'' /etc/hosts

    echo "" >> /etc/hosts

  done
}

keg_update_local_hosts_file
