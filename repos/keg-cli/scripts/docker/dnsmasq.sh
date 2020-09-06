# Add code create file at /usr/local/etc/dnsmasq.conf
# File should include the following
#
# echo 'conf-file=/Users/{{ user name }}/.kegConfig/dnsmasq.conf' > /usr/local/etc/dnsmasq.conf
# Example:
# echo 'conf-file=/Users/lancetipton/.kegConfig/dnsmasq.conf' > /usr/local/etc/dnsmasq.conf
#
# Then create file at /Users/lancetipton/.kegConfig/dnsmasq.conf
# Should look like this:
# address=/kegdev.xyz/127.0.0.1
# listen-address=127.0.0.1
# 
# Then update you mac DNS settings to use 127.0.0.1 as the first DNS resolver.
# * Go to system preferences > network
# * Click on the advanced button
# * Then click on the DNS tab
#   * Add 127.0.0.1 as the first entry in the DNS servers list
#   * Looks like this => https://hedichaibi.com/wp-content/uploads/2018/05/macos-dns-conf.png

brew install dnsmasq
echo 'conf-file=/Users/lancetipton/.kegConfig/dnsmasq.conf' > /usr/local/etc/dnsmasq.conf
echo 'address=/kegdev.xyz/127.0.0.1' > /Users/$USER/.kegConfig/dnsmasq.conf
echo 'listen-address=127.0.0.1' >> /Users/$USER/.kegConfig/dnsmasq.conf
sudo brew services stop dnsmasq
sudo brew services start dnsmasq



# bash <(curl -s https://gist.github.com/drye/5387341/raw/ec72cddfe43ec3d39c91a3c118cb68ab14a049f8/enable_dnsmasq_on_osx.sh)

# installing dnsmasq and enable daemon
brew install dnsmasq
sudo cp -v $(brew --prefix dnsmasq)/homebrew.mxcl.dnsmasq.plist /Library/LaunchDaemons

# adding resolver for vbox domain
[ -d /etc/resolver ] || sudo mkdir -v /etc/resolver
sudo bash -c 'echo "nameserver 127.0.0.1" > /etc/resolver/vbox'

# configuring dnsmasq
sudo mkdir -p $(brew --prefix)/etc/
cat > $(brew --prefix)/etc/dnsmasq.conf <<-EOF
listen-address=127.0.0.1
address=/.kedev.xyz/127.0.0.1
# keep nameserver order of resolv.conf
strict-order
EOF

# launching dnsmasq
sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist