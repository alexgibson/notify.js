Notify.js
=========

[![Build Status](https://travis-ci.org/alexgibson/notify.js.png?branch=master)](https://travis-ci.org/alexgibson/notify.js)

A handy wrapper for using the [Web Notifications API](http://www.w3.org/TR/notifications/).
Notify.js aims to simplify requesting user permission and associated Web
Notification API events, as well as providing a few extra callbacks and
convenience methods.

Online demo: https://alexgibson.github.io/notify.js/

Installation
------------

```
npm install notifyjs
```

Note: when installed via npm the Notify.js source file is located at `./dist/notify.js`.

Build
-----

Notify.js is written in ES6 and transpiled to ES5 & UMD using [jspm](http://jspm.io/). Before
building from source, make sure you have the [jspm CLI installed](http://jspm.io/docs/getting-started.html).

Install dependencies:

```
npm install
```

Install jspm dependencies:

```
jspm install
```

Then build from source:

```
npm run build
```

Usage
-----

To initialize a web notification create a new `Notify` instance, passing the
message `title` as well as any other options you wish to use.

Note: this example is using a browser global, but you can also require Notify.js
using CommonJS if you prefer.

```
var Notify = window.Notify.default;

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

It's a good idea to make sure that you have permissions to send notifications
first.

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

All options supported in the [Notifications API specification](https://notifications.spec.whatwg.org/#dictdef-notificationoptions),
in addition to:

* `timeout`: (integer) - number of seconds to close the notification automatically
* `closeOnClick`: (boolean) - close the notification when clicked. Useful in
chrome where the notification remains open until the timeout or the x is clicked.
* `notifyShow`: (function) - callback when notification is shown
* `notifyClose`: (function) - callback when notification is closed
* `notifyClick`: (function) - callback when notification is clicked
* `notifyError`: (function) - callback when notification throws an error

Static methods and properties
-----------------------------

* `Notify.requestPermission(onPermissionGrantedCallback, onPermissionDeniedCallback)` -
requests permission from the user if needed and handles permission callbacks.
* `Notify.isSupported` - Function to test for Web Notifications API browser
support
* `Notify.needsPermission` - Boolean property to check if permission is needed
for the user to receive notifications.

Instance methods
----------------
* `Notify.show` - Function to display the Notify instance
* `Notify.close` - Function to close the Notify instance

Test
----

In the project root, to perform a single pass of the tests using Firefox run:

```
npm run test
```

This will also automatically build from source before running the tests.

Demo example
------------

An easy way to run the provided demo file is to use python `SimpleHTTPServer`
and then navigate to the `/example` directory:

```
python -m SimpleHTTPServer
```

Browser support
---------------

http://caniuse.com/#search=notifications
