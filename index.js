'use strict';

var React = require('react-native');

var { NativeModules, RCTDeviceEventEmitter, DeviceEventEmitter } = React;

var getRotation = function (rotation) {
  if(rotation == 90) {
    rotation = 1;
  } else if (rotation == 180) {
    rotation = 2;
  } else if(rotation == 270) {
    rotation = 3;
  }
  return rotation;
};

DeviceEventEmitter = RCTDeviceEventEmitter ? RCTDeviceEventEmitter : DeviceEventEmitter;

module.exports = {
  rotate: function (rotation) {
    NativeModules.OrientationController.rotate(getRotation(rotation));
  },
  getOrientation: function(callback) {
    NativeModules.OrientationController.getOrientation(callback);
  },
  addListener: function(callback) {
    return DeviceEventEmitter.addListener(
      'orientationDidChange', function () {
        callback.apply(this, arguments[0])
      }
    );
  },
  removeListener: function(listener) {
    DeviceEventEmitter.removeListener(
      'orientationDidChange', listener
    );
   }
}
