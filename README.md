# RaspberryPi-app
> Developer Tools for Raspberry PI (touchscreen)

## Supported Platforms
The client applicaiton currently support [Raspberry PI](https://www.raspberrypi.org/) 2 & 3 running a Debain OS such as [Raspbian](https://www.raspbian.org/)

## Installation (Development Build)
Note; This installation guide has only been tested on a fresh installation of Raspbian OS. Ensure the operating system has Git installed.

```
git clone git@github.com:muhammaddadu/raspberrypi-app.git
cd the-box-client
chmod +x scripts/install-dependencies-rpi3.sh
./install-dependencies-rpi3.sh
```

## Running the Application
```
npm run start
```

To enable devtools, use
```
npm run start dev
```

### Enabling autostart on bootup
On your Pi, edit the file /home/pi/.config/lxsession/LXDE-pi/autostart using the editor of your choice. You must edit with root, for example:
```
sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart
```

Add commands below the comment, but leave the line exit 0 at the end, then save the file and exit.
```
@/usr/local/bin/electron /var/development/the-box-client/runner.js
```

### Notes for development
To ensure the applicationing will open up in the remote screen (inside an SSH session), use the following command.
```
export DISPLAY=:0
```

The command ```nohup``` will allow the application to continue running after closing the remote session.

If audio does not output through HDMI, use the following command.
```
amixer cset numid=3 2
```

Preventing the screen from dimming can be done by modifying the file
```
sudo nano /etc/lightdm/lightdm.conf
```

Add the following lines to the [SeatDefaults] section:
```
# don't sleep the screen
xserver-command=X -s 0 dpms
```

