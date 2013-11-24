(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD environment
        define('notify', [], function () {
            return factory(root, document);
        });
    } else {
        // Browser environment
        root.Notify = factory(root, document);
    }

}(this, function (w, d) {

    'use strict';

    function Notify(title, options) {

        this.title = typeof title === 'string' ? title : null;

        this.options = {
            icon: '',
            body: '',
            tag: '',
            notifyShow: null,
            notifyClose: null,
            notifyClick: null,
            notifyError: null,
            permissionGranted: null,
            permissionDenied: null
        };

        this.permission = null;

        if (!this.isSupported()) {
            return;
        }

        if (!this.title) {
            throw new Error('Notify(): first arg (title) must be a string.');
        }

        //User defined options for notification content
        if (typeof options === 'object') {

            for (var i in options) {
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

            //callback when notification throws error
            if (typeof this.options.notifyError === 'function') {
                this.onErrorCallback = this.options.notifyError;
            }

            //callback user grants permission for notification
            if (typeof this.options.permissionGranted === 'function') {
                this.onPermissionGrantedCallback = this.options.permissionGranted;
            }

            //callback user denies permission for notification
            if (typeof this.options.permissionDenied === 'function') {
                this.onPermissionDeniedCallback = this.options.permissionDenied;
            }
        }
    }

    Notify.prototype.needsPermission = function () {
        if ('Notification' in w && Notification.permission === 'granted') {
            return false;
        }
        // mozNotification requests permission automatically
        // so we don't need to handle that in the lib
        if ('mozNotification' in navigator) {
            return false;
        }
        return true;
    };

    Notify.prototype.requestPermission = function () {
        var that = this;
        w.Notification.requestPermission(function (perm) {
            that.permission = perm;
            switch (that.permission) {
            case 'granted':
                that.onPermissionGranted();
                break;
            case 'denied':
                that.onPermissionDenied();
                break;
            }
        });
    };

    Notify.prototype.show = function () {

        if (!this.isSupported()) {
            return;
        }

        if ('Notification' in w) {
            this.myNotify = new Notification(this.title, {
                'body': this.options.body,
                'tag' : this.options.tag,
                'icon' : this.options.icon
            });

            this.myNotify.addEventListener('show', this, false);
            this.myNotify.addEventListener('error', this, false);

        } else {
            this.myNotify = navigator.mozNotification.createNotification(
                this.title,
                this.options.body
            );
            this.myNotify.show();
        }

        this.myNotify.addEventListener('close', this, false);
        this.myNotify.addEventListener('click', this, false);
    };

    Notify.prototype.onShowNotification = function () {
        if (this.onShowCallback) {
            this.onShowCallback();
        }
    };

    Notify.prototype.onCloseNotification = function () {
        if (this.onCloseCallback) {
            this.onCloseCallback();
        }
        this.destroy();
    };

    Notify.prototype.onClickNotification = function () {
        if (this.onClickCallback) {
            this.onClickCallback();
        }
    };

    Notify.prototype.onErrorNotification = function () {
        if (this.onErrorCallback) {
            this.onErrorCallback();
        }
        this.destroy();
    };

    Notify.prototype.onPermissionGranted = function () {
        if (this.onPermissionGrantedCallback) {
            this.onPermissionGrantedCallback();
        }
    };

    Notify.prototype.onPermissionDenied = function () {
        if (this.onPermissionDeniedCallback) {
            this.onPermissionDeniedCallback();
        }
    };

    Notify.prototype.destroy = function () {
        if ('Notification' in w) {
            this.myNotify.removeEventListener('show', this, false);
            this.myNotify.removeEventListener('error', this, false);
        }
        this.myNotify.removeEventListener('close', this, false);
        this.myNotify.removeEventListener('click', this, false);
    };

    Notify.prototype.isSupported = function () {
        if ('Notification' in w || 'mozNotification' in navigator) {
            return true;
        }
        return false;
    };

    Notify.prototype.handleEvent = function (e) {
        switch (e.type) {
        case 'show':
            this.onShowNotification(e);
            break;
        case 'close':
            this.onCloseNotification(e);
            break;
        case 'click':
            this.onClickNotification(e);
            break;
        case 'error':
            this.onErrorNotification(e);
            break;
        }
    };

    return Notify;

}));
