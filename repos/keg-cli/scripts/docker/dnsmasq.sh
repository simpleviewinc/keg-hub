# ------ DNS SETUP ------ #
# 
# This installs and setups dnsmasq
# Only needed when running docker-for-mac, and don't want to use localhost
# The other option is to use (<serivce>.)local.kegdex.xyz to load apps in the browser
#
# ### Setup
# **Step 1**
# * Run this script from the terminal
#   * `bash <keg-cli path>/scripts/docker/dnsmasq.sh` 
# * Should install dnsmasq
# * Should setup a LaunchDaemon to ensure dnsmasq runs on boot
# * Should create a file as /Users/<user name>/.kegConfig/dnsmasq.conf
# * Should add the custom config to the root config at /usr/local/etc/dnsmasq.conf
# 
# **Step 2**
# * Next update you mac DNS settings to use 127.0.0.1 as the first DNS resolver.
# * Go to system preferences > network
# * Click on the advanced button
# * Then click on the DNS tab
#   * Add 127.0.0.1 as the first entry in the DNS servers list
#   * Looks like this => http://snpy.in/vHkGoj
# 
# ------ END OF SETUP ------ #


# Path to custom keg DNS config
KEG_DNS_MASQ_CONF=/Users/$USER/.kegConfig/dnsmasq.conf

# Prints a message to the terminal through stderr
keg_message(){
  echo "[ KEG CLI ] $@" >&2
  return
}

keg_install_dnsmasq(){
  brew install dnsmasq
}

# Add custom config path to the main dnsmasq config
keg_add_custom_config(){
  local DNS_CONFIG=$(cat /usr/local/etc/dnsmasq.conf | grep ".kegConfig/dnsmasq.conf")
  if [[ -z "$DNS_CONFIG" ]]; then
    echo "conf-file=$KEG_DNS_MASQ_CONF" > /usr/local/etc/dnsmasq.conf
  fi
}

# Create custom config and add the kegdev config to it
keg_create_dns_config(){
  cat > $KEG_DNS_MASQ_CONF <<-EOF
  address=/kegdev.xyz/127.0.0.1
  listen-address=127.0.0.1
  strict-order
EOF
}

# Stop and start the dnsmasq service
# Wrap the stop call incase it's not running which will cause error output
keg_ensure_dns_masq_running(){
  sudo brew services stop dnsmasq 2> /dev/null
  sudo brew services start dnsmasq 2> /dev/null
}

# Sets up dnsmasq for the keg, to allow local DNS routing for the kegdev xyz domain
keg_setup_dnsmasq(){
  keg_install_dnsmasq
  keg_create_dns_config
  keg_add_custom_config
  keg_ensure_dns_masq_running
}

keg_check_remove_file(){
  if [[ -f "$1" ]]; then
    if [[ "$2" ]]; then
      sudo rm -rf $1
    else
      rm -rf $1
    fi
  fi
}

# Remove dnsmasq from the machine
keg_remove_dnsmasq(){
  # Remove the keg custom config for dnsmasq
  keg_check_remove_file $KEG_DNS_MASQ_CONF

  # Remove the dnsmasq service, and uninstall it
  sudo brew services stop dnsmasq 2> /dev/null
  brew uninstall dnsmasq 2> /dev/null

  # Remove dnsmasq files required with sudo
  keg_check_remove_file "/usr/local/etc/dnsmasq.conf.default" "sudo"
  keg_check_remove_file "/usr/local/etc/dnsmasq.conf" "sudo"
  keg_check_remove_file "/usr/local/etc/dnsmasq.d" "sudo"
  
  keg_message "Successfully removed dnsmasq!"
}

# Check if we should remove or install dnsmasq
if [[ "$1" == "remove" || "$1" == "rm" ]]; then
  keg_message "Removeing dnsmasq from system..."
  keg_remove_dnsmasq "${@:2}"
else
  keg_message "Installing dnsmasq..."
  keg_setup_dnsmasq "$@"
fi
