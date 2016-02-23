Notify.js
=========

[![Build Status](https://travis-ci.org/alexgibson/notify.js.png?branch=master)](https://travis-ci.org/alexgibson/notify.js)

A handy wrapper for using the [Web Notifications API](http://www.w3.org/TR/notifications/). Notify.js aims to simplify requesting user permission and associated Web Notification API events, as well as providing a few extra callbacks and convenience methods.

Online demo: https://alexgibson.github.io/notify.js/

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/notify.js/zipball/master)
* [NPM](https://www.npmjs.org/): `npm install notifyjs`
* [Bower](https://github.com/twitter/bower/): `bower install notify.js`
* Git: `git clone https://github.com/alexgibson/notify.js`

Setup
---------

This component can be used as an AMD module, CommonJS module, or a global.

### for AMD module:
```
define(['./notify'], function(Notify) {
     var myNotification = new Notify();
    // ...
});
```

### for CommonJS:
```
var Notify = require('notifyjs');
```

Usage
-----

To initialize a web notification create a new `Notify` instance, passing the message `title` as well as any other options you wish to use.

```
var myNotification = new Notify('Yo dawg!', {
	body: 'This is an awesome notification',
	notifyShow: onNotifyShow
});

function onNotifyShow() {
	console.log('notification was shown!');
}
```

Then show the notification.  

```
myNotification.show();
```

It's a good idea to make sure that you have permissions to send notifications first.

```
if (!Notify.needsPermission) {
    doNotification();
} else if (Notify.isSupported()) {
    Notify.requestPermission(onPermissionGranted, onPermissionDenied);
}

function onPermissionGranted() {
	console.log('Permission has been granted by the user');
	doNotification();
}

function onPermissionDenied() {
	console.warn('Permission has been denied by the user');
}
```

Required parameters
-------------------

* title (string) - notification title

Optional parameters
-------------------

* `body`: (string) - notification message body
* `icon`: (string) - path for icon to display in notification
* `tag`: (string) - unique identifier to stop duplicate notifications
* `lang`: (string) - BCP 47 language tag for the notification (default: `en`)
* `timeout`: (integer) - number of seconds to close the notification automatically
* `silent`: (boolean) - indicates that no sounds or vibrations should be made (default: `false`)
* `requireInteraction`: (boolean) - keep the notification open indefinitely
* `closeOnClick`: (boolean) - close the notification when clicked. Useful in chrome where the notification remains open until the timeout or the x is clicked.
* `notifyShow`: (function) - callback when notification is shown
* `notifyClose`: (function) - callback when notification is closed
* `notifyClick`: (function) - callback when notification is clicked
* `notifyError`: (function) - callback when notification throws an error

Static methods and properties
-----------------------------

* `Notify.requestPermission(onPermissionGrantedCallback, onPermissionDeniedCallback)` - requests permission from the user if needed and handles permission callbacks.
* `Notify.isSupported` - Function to test for Web Notifications API browser support
* `Notify.needsPermission` - Boolean property to check if permission is needed for the user to receive notifications.

Instance methods
-----------------------------
* `Notify.show` - Function to display the Notify instance
* `Notify.close` - Function to close the Notify instance

Testing
-------

Install [Node](http://nodejs.org). Testing relies on the Karma test-runner, which can be installed by running the following command from the project root:

```
npm install
```

In the project root, to perform a single pass of the tests using Firefox run:

```
npm test
```

Demo
----

An easy way to run the provided demo file is to use python `SimpleHTTPServer` and then navigate to the `/example` directory:

```
python -m SimpleHTTPServer
```

Browser support
---------------------------------------

- Chrome (desktop)
- Safari
- Firefox
- Firefox OS (v1.2+)
- Firefox Mobile (Android)
