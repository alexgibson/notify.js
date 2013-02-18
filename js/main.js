/*
 * Copyright (c) 2013 Alex Gibson
 * Released under MIT license
 * http://alxgbsn.co.uk
 */

/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, console: false */
/*global webkitAudioContext: false, AudioContext: false, requestAnimationFrame: false */

var myApp = (function () {

	'use strict';

	return {

		onShowNotification: function () {
			console.log('notification is shown!');
		},

		onCloseNotification: function () {
			console.log('notification is closed!');
		},

		onClickNotification: function () {
			console.log('notification was clicked!');
		},

		onPermissionDenied: function () {
			console.log('Permission has been denied by the user');
		},

		init: function () {
			var doc = document;

			doc.getElementById('my-button').addEventListener('click', function () {
				var myNotification = new Notify('Yo dawg!', {body: 'This is an awesome notification', tag: 'My unique id', notifyShow: myApp.onShowNotification, notifyClose: myApp.onCloseNotification, notifyClick: myApp.onClickNotification, permissionDenied: myApp.onPermissionDenied});
				myNotification.show();
			}, false);

			//prevent default document scrolling
			doc.addEventListener('touchmove', function (e) {
				if (e.target.type === 'range') { return; }
				e.preventDefault();
			}, false);

			//enable CSS active pseudo styles
			doc.addEventListener("touchstart", function () {}, false);
		}
	};
}());

window.addEventListener("DOMContentLoaded", myApp.init, true);