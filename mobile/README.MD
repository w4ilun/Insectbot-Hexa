##Insectbot mobile app controller

This directory contains the mobile app for controlling the Insectbot.

It is a Cordova web app that uses a Bluetooth LE plugin [BluetoothLE](https://github.com/randdusing/BluetoothLE) by [Rand Dusing](https://github.com/randdusing)

<img src="../pictures/App.png" width=500 height=300 />

###Instructions

* Git clone project
* Go into app directory ```cd mobile/```
* Install BLE plugin ```cordova plugin add https://github.com/randdusing/BluetoothLE```
* (optional) ```cordova plugin add cordova-plugin-dialogs```
* (optional) ```cordova plugin add cordova-plugin-vibration```
* Build```cordova build android --release```
* Run on device```cordova run android --device```