
# See this website for more info
# https://github.com/Magnitus-/DockerFiles/tree/master/electron-app
# https://sourabhbajaj.com/blog/2017/02/07/gui-applications-docker-mac/
# https://gist.github.com/cschiewek/246a244ba23da8b9f0e7b11a68bf3285
# https://medium.com/@SaravSun/running-gui-applications-inside-docker-containers-83d65c0db110

# Prints a message to the terminal through stderr
keg_message(){
  echo "[ KEG CLI ] $@" >&2
  return
}

keg_add_xquartz(){
  keg_message "Checking if xquartz is installed..."
  if [[ -x "$(command -v xquartz 2>/dev/null)" ]] && [[ -d "/Applications/xquartz.app" ]]; then
    keg_message "xquartz is installed"
  else
    brew cask install xquartz
  fi

  keg_setup_xquartx
}

keg_setup_xquartx(){

  keg_message ""
  keg_message "--- IMPORTANT ---"
  keg_message "In the XQuartz preferences, go to the “Security” tab and make sure you’ve got “Allow connections from network clients” ticked"
  keg_message "--- IMPORTANT ---"
  keg_message ""

  keg_message "Opening XQuartz app..."

  # Sleep, so people actually read the message
  sleep(5)

  open -a XQuartz
  
  # Set the ip of the local machine
  # May need to switch this to en1, when on wifi
  local IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
  xhost + $IP

  # If no xhost, then validate it's in the $PATH
  # Add this, if it's not => usr/X11/bin/xhost

  # Then add mounted volume in the docker run cmd
  # docker run -d -e DISPLAY=$IP:0 -v /tmp/.X11-unix:/tmp/.X11-unix
  
  # This may also need to be added to the Dockerfile
  # RUN apt-get update -y && \
  #     apt-get install -y libgtk2.0-0 && \
  #     apt-get install -y libnotify-dev && \
  #     apt-get install -y libgconf-2-4 && \
  #     apt-get install -y libnss3

}


keg_electron_setup(){
  
  if [[ -z "$1" || "$1" == "xq" ]]; then
    keg_add_xquartz

  elif [[ "$1" == "setup" ]]; then
    keg_setup_xquartx

  fi
}


keg_electron_setup "$@"