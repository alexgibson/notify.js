/*
 * Copyright (c) 2013 Alex Gibson
 * Released under MIT license
 * http://alxgbsn.co.uk
 */

/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, console: false */
/*global webkitNotifications: false, Notifications: false */

(function (window, document) {
	'use strict';

	function Notify(title, options) {

		var i;

		this.title = typeof title === 'string' ? title : null;

		this.options = {
			iconPath: '',
			body: '',
			notifyShow: null,
			notifyClose: null,
			notifyClick: null,
			notifyError: null
		};

		if (!this.title) {
			throw new Error('Notify(): first arg (title) must be a string.');
		}

		//User defined options for notification content
		if (typeof options === 'object') {

			for (i in options) {
				if (options.hasOwnProperty(i)) {
					this.options[i] = options[i];
				}
			}

			//callback when notification is displayed
			if (typeof this.options.notifyShow === 'function') {
				this.onShowCallback = this.options.notifyShow;
			}

			//callback when notification is closed
			if (typeof this.options.notifyClose === 'function') {
				this.onCloseCallback = this.options.notifyClose;
			}

			//callback when notification is clicked
			if (typeof this.options.notifyClick === 'function') {
				this.onClickCallback = this.options.notifyClick;
			}

			//callback when notification is clicked
			if (typeof this.options.notifyError === 'function') {
				this.onErrorCallback = this.options.notifyError;
			}
		}

		if (window.webkitNotifications) {
			this.notifications = window.webkitNotifications;
		} else if (window.Notifications) {
			this.notifications = window.Notifications;
		} else {
			console.warn('Web Notifications are not currently supported by this browser');
			return;
		}
	}

	Notify.prototype.requestPermission = function () {
		var that = this;
		this.notifications.requestPermission(function () {
			switch (that.notifications.checkPermission()) {
			case 0: //WebKit
				that.createNotification();
				break;
			case 'granted': //W3C
				that.createNotification();
				break;
			}
		});
	};

	Notify.prototype.show = function () {
		var permission;
		if (!this.notifications) { return; }
		permission = this.notifications.checkPermission();
		if (permission === 0 || permission === 'granted') { //WebKit || W3C
			this.createNotification();
		} else {
			this.requestPermission();
		}
	};

	Notify.prototype.createNotification = function () {
		try {
			this.myNotify = this.notifications.createNotification(this.options.iconPath, this.title, this.options.body);
			this.myNotify.addEventListener('show', this, false);
			this.myNotify.addEventListener('close', this, false);
			this.myNotify.addEventListener('click', this, false);
			this.myNotify.addEventListener('error', this, false);
			this.myNotify.show();
		} catch (e) {
			console.error(e);
		}
	};

	Notify.prototype.onShowNotification = function (e) {
		if (this.onShowCallback) {
			this.onShowCallback();
		}
	};

	Notify.prototype.onCloseNotification = function (e) {
		if (this.onCloseCallback) {
			this.onCloseCallback();
		}
		this.removeEvents();
	};

	Notify.prototype.onClickNotification = function (e) {
		if (this.onClickCallback) {
			this.onClickCallback();
		}
		this.removeEvents();
	};

	Notify.prototype.onErrorNotification = function (e) {
		if (this.onErrorCallback) {
			this.onErrorCallback();
		}
		this.removeEvents();
	};

	Notify.prototype.removeEvents = function () {
		this.myNotify.removeEventListener('show', this, false);
		this.myNotify.removeEventListener('close', this, false);
		this.myNotify.removeEventListener('click', this, false);
		this.myNotify.removeEventListener('error', this, false);
	};

	Notify.prototype.destroy = function () {
		this.removeEvents();
		this.myNotify = null;
		this.notifications = null;
	};

	Notify.prototype.handleEvent = function (e) {
		switch (e.type) {
		case 'show': this.onShowNotification(e); break;
		case 'close': this.onCloseNotification(e); break;
		case 'click': this.onClickNotification(e); break;
		case 'error': this.onErrorNotification(e); break;
		}
	};

	//public
	window.Notify = Notify;

}(window, document));