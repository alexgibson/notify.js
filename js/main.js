define(function(require) {

    'use strict';

    var Notify = require('notify');

    document.getElementById('my-button').addEventListener('click', function () {

        function onShowNotification () {
            console.log('notification is shown!');
        }

        function onCloseNotification () {
            console.log('notification is closed!');
        }

        function onClickNotification () {
            console.log('notification was clicked!');
        }

        function onErrorNotification () {
            console.error('Error showing notification. You may need to request permission.');
        }

        function onPermissionGranted () {
            console.log('Permission has been granted by the user');
            doNotification();
        }

        function onPermissionDenied () {
            console.warn('Permission has been denied by the user');
        }

        function doNotification () {
            var myNotification = new Notify('Yo dawg!', {
                body: 'This is an awesome notification',
                tag: 'My unique id',
                notifyShow: onShowNotification,
                notifyClose: onCloseNotification,
                notifyClick: onClickNotification,
                notifyError: onErrorNotification,
                timeout: 4
            });

            myNotification.show();
        }

        if (Notify.needsPermission) {
            Notify.requestPermission(onPermissionGranted, onPermissionDenied);
        } else {
            doNotification();
        }

    }, false);
});
