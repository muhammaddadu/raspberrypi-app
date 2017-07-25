#!/bin/bash
##
# The Box
# This script is to be used with Raspberry PI 2 (running raspbian)
# Experemental support for Raspberry PI 3
##
sudo -s; # Ensure rinning as root

export DEBIAN_FRONTEND=noninteractive;
export TARGET_NODE_VERSION=6.10.0;
export PACKAGE_REPO="git@github.com:muhammaddadu/the-box-client.git";
export INSTALL_DIR=/var/app
export PORJECT_NAME="The Box";

# load functions
source ./functions.sh

echo "NodeJS:        $(echo_if $(is_installed node))"
echo "MongoDB:       $(echo_if $(is_installed mongod))"
echo "initd-forever: $(echo_if $(is_installed initd-forever))"
echo ""

if [ -e $INSTALL_DIR ];
then
    echo $PORJECT_NAME "provisioning already completed. Skipping..."
    exit 0
else
    echo "Installation Starting..."
fi

echo "Updating/Installing Core Componenets..."
apt-get update > /dev/null
# Install build tools
apt-get install -y make g++ git curl vim libcairo2-dev libav-tools nfs-common portmap software-properties-common > /dev/null
echo "Updated/Installed!"


##
# NodeJS
##
if [ $(is_installed node) == 1 ];
then
	echo "Skipping NodeJS installation"
else
	cd /tmp;
	wget "https://nodejs.org/dist/v${NODE_VERSION}/node-v"$NODE_VERSION"-linux-arm64.tar.gz"
	tar -xvf "node-v"$NODE_VERSION"-linux-arm64.tar.gz"
	cd "node-v"$NODE_VERSION"-linux-arm64"
	cp -R * /usr/local/
fi

##
# initd-forever
##
if [ $(is_installed initd-forever) == 1 ];
then
	echo "Skipping initd-forever installation"
else
	echo "Installing initd-forever..."
	npm install -g initd-forever forever > /dev/null
	echo "Installed!"
fi

##
# To run on boot, Need to look into window managers to
# load this application directly without the default GUI
# http://www.raspberry-projects.com/pi/pi-operating-systems/raspbian/auto-running-programs-gui
##
