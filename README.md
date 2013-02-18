Notify.js
=========

A handy wrapper for the [Web Notifications API](http://www.w3.org/TR/notifications/).

Notify.js will automatically handle requesting user permission and associated API events for you. It also goes some way toward bridging the gap between the current WebKit implementation and what's in the official W3C specification.

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/notify.js/zipball/master)
* [Bower](https://github.com/twitter/bower/): `bower install notify.js`
* Git: `git clone https://github.com/alexgibson/notify.js`

Setup
---------

First, include the main notify.js JavaScript file in your HTML document:

```
<script src="notify.js"></script>
```

Next create a new Notify instance, passing the relevant message parameters and callbacks you want to use:

```
var myNotification = new Notify('Yo dawg!', {
	body: 'This is an awesome notification', 
	notifyShow: myApp.onShowNotification, 
	notifyClose: myApp.onCloseNotification, 
	notifyClick: myApp.onClickNotification, 
	notifyError: myApp.onErrorNotification
});

function onNotifyShow() {
	console.log('notification was shown!');
}
```

To then show your notification, you can simply call:

```
myNotification.show(); 
```

Required parameters
-------------------

* title (string) - notification title

Optional parameters
-------------------

* body: (string) - notification message body
* notifyShow: (function) - callback when the notification is shown
* notifyClose: (function) - callback when the notification is closed
* notifyClick: (function) - callback when the notification is clicked
* notifyError: (function) - callback when there is a permission error

Supported web browsers
---------------------------------------

- Chrome
- Safari 6

Browsers that do not yet support the Web Notification API will simply report a console warning instead of showing a notification. This plugin will be kept up to date as more browsers add support for the API and as the spec changes.
	
MIT License
---------------------------------------

Copyright (c) 2013 Alex Gibson

http://alxgbsn.co.uk/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction except as noted below, including without limitation the rights to use, copy, modify, merge, publish, distribute, and/or sublicense, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE