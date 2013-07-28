define(function(require) {
    
    'use strict';

    var Notify = require('notify');

    function onShowNotification () {
        console.log('notification is shown!');
    }

    function onCloseNotification () {
        console.log('notification is closed!');
    }

    function onClickNotification () {
        console.log('notification was clicked!');
    }

    function onPermissionDenied () {
        alert('Permission has been denied by the user for this domain');
    }

    document.getElementById('my-button').addEventListener('click', function () {

        var myNotification = new Notify('Yo dawg!', {
            body: 'This is an awesome notification', 
            tag: 'My unique id', 
            notifyShow: onShowNotification, 
            notifyClose: onCloseNotification, 
            notifyClick: onClickNotification, 
            permissionDenied: onPermissionDenied
        });

        myNotification.show();

    }, false);

});
