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
# * The DNS resolvers should be updated automatically
# * But you can validate it by check your DNS settings in system preferences
# * Go to system preferences > network
# * Click on the advanced button
# * Then click on the DNS tab
#   * Ensure `127.0.0.1` is the first entry in the DNS servers list
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
  if [[ -x "$(command -v dnsmasq 2>/dev/null)" ]]; then
    keg_message "System already has dnsmasq installed!"
  else
    brew install dnsmasq
  fi
}

# Add custom config path to the main dnsmasq config
keg_add_custom_config(){
  keg_message "Adding custom config to dnsmasq..."
  local DNS_CONFIG=$(cat /usr/local/etc/dnsmasq.conf | grep ".kegConfig/dnsmasq.conf")
  if [[ -z "$DNS_CONFIG" ]]; then
    echo "conf-file=$KEG_DNS_MASQ_CONF" > /usr/local/etc/dnsmasq.conf
  fi
}

# Create custom config and add the kegdev config to it
keg_create_dns_config(){
  keg_message "Creating custom dnsmasq config..."
  cat > $KEG_DNS_MASQ_CONF <<-EOF
  address=/kegdev.xyz/127.0.0.1
  listen-address=127.0.0.1
  strict-order
EOF
}

# Stop and start the dnsmasq service
# Wrap the stop call incase it's not running which will cause error output
keg_ensure_dns_masq_running(){
  keg_message "Ensuring dnsmasq service is running..."
  sudo brew services stop dnsmasq 2> /dev/null
  sudo brew services start dnsmasq 2> /dev/null
}

# Updates the DNS server resolvers with an internal DNS
# Ensures the internal DNS comes first
keg_update_dns_servers(){
  keg_message "Updating system DNS servers to use internal DNS..."

  local INTERNAL_DNS=127.0.0.1

  # Get the name of the primary network interface
  local IFACE=$( echo 'show State:/Network/Global/IPv4' | scutil | grep PrimaryInterface | cut -d: -f2 | xargs echo )

  # Get the current active service
  local SERVICE_NAME=$( networksetup -listnetworkserviceorder | grep "$IFACE" | cut -d: -f2 | cut -d, -f1 | xargs echo )

  # Backup the current DNS settings
  local CURRENT_SERVERS="$(networksetup -getdnsservers "$SERVICE_NAME")"
  local HAS_INTERNAL_DNS="$(networksetup -getdnsservers "$SERVICE_NAME" | grep "$INTERNAL_DNS")"

  if [[ -z "$HAS_INTERNAL_DNS" ]]; then
    # Append the DNS servers including the internal DNS
    networksetup -setdnsservers "$SERVICE_NAME" $INTERNAL_DNS $CURRENT_SERVERS
  fi

}

# Sets up dnsmasq for the keg, to allow local DNS routing for the kegdev xyz domain
keg_setup_dnsmasq(){
  keg_install_dnsmasq
  keg_create_dns_config
  keg_add_custom_config
  keg_ensure_dns_masq_running
  keg_update_dns_servers
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
  keg_message "You must manually remove 127.0.0.1 from the network interface DNS servers!"
  keg_message "Settings are located in \"system preferences > network > advanced > Dns (tab)!\""
}

# Check if we should remove or install dnsmasq
if [[ "$1" == "remove" || "$1" == "rm" ]]; then
  keg_message "Removeing dnsmasq from system..."
  keg_remove_dnsmasq "${@:2}"
else
  keg_message "Installing dnsmasq..."
  keg_setup_dnsmasq "$@"
fi
