Notify.js
=========

A handy wrapper for using the [Web Notifications API](http://www.w3.org/TR/notifications/). Notify.js automatically handles requesting user permission and associated Web Notification API events, as well as adding a few extra convenience methods.

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/notify.js/zipball/master)
* [Bower](https://github.com/twitter/bower/): `bower install notify.js`
* Git: `git clone https://github.com/alexgibson/notify.js`

Setup
---------

This component can be used as an AMD module, or a global.

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

Required parameters
-------------------

* title (string) - notification title

Optional parameters
-------------------

* body: (string) - notification message body
* tag: (string) - unique identifier to stop duplicate notifications
* notifyShow: (function) - callback when the notification is shown
* notifyClose: (function) - callback when the notification is closed
* notifyClick: (function) - callback when the notification is clicked
* permissionDenied: (function) - callback when user has denied permission for domain

Useful methods
--------------

* `isSupported()` - (returns boolean) test for Web Notifications API browser support
* `destroy()` - remove event listeners

Testing
-------

Install [Node](http://nodejs.org). Testing relies on the Karma test-runner, which can be installed globally using the following command.

```
npm install -g karma
```

In the project root, run the tests using

```
npm test
```

Browser support
---------------------------------------

- Chrome
- Safari 6+
- Firefox

Browsers that do not yet support the Web Notification API will return silently.
