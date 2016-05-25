/* global Notify, describe, beforeEach, afterEach, it, expect, sinon, spyOn, jasmine */

describe('instantiation', function() {

    'use strict';

    var Notify = window.Notify.default;

    it('should create a new Notify instance', function() {
        var notification = new Notify('foo');
        expect(notification instanceof window.Notify.default).toBeTruthy();
    });

    it('should throw an exception if has no title', function() {
        expect(function() {
            new Notify();
        }).toThrow();
    });
});

describe('isSupported', function() {

    'use strict';

    var Notify = window.Notify.default;

    it('should return true when notifications are supported', function() {
        expect(Notify.isSupported()).toBeTruthy();
    });

    it('should throw an error if permission has already been granted', function() {
        expect(function() {
            Notify.isSupported('granted');
        }).toThrow();
    });
});

describe('permission', function() {

    'use strict';

    var Notify = window.Notify.default;

    afterEach(function() {
        Notify.permissionLevel = Notification.permission;
    });

    it('should check if permission is needed', function() {
        expect(typeof Notify.needsPermission).toBe('boolean');
    });

    it('should request permission from the user', function() {
        spyOn(window.Notification, 'requestPermission');
        Notify.requestPermission();
        expect(window.Notification.requestPermission).toHaveBeenCalled();
    });

    describe('requestPermission (granted)', function() {
        beforeEach(function(done) {
            spyOn(window.Notification, 'requestPermission').and.callFake(function(cb) {
                cb('granted');
                done();
            });
            Notify.requestPermission();
        });

        it('should update permissionLevel and needsPermission if the user accepts the request', function() {
            expect(Notify.needsPermission).toBeFalsy();
        });
    });

    describe('requestPermission (denied)', function() {
        beforeEach(function(done) {
            spyOn(window.Notification, 'requestPermission').and.callFake(function(cb) {
                cb('denied');
                done();
            });
            Notify.requestPermission();
        });

        it('should update permissionLevel and needsPermission if the user rejects the request', function() {
            expect(Notify.needsPermission).toBeTruthy();
        });
    });
});

describe('callbacks', function() {

    'use strict';

    var Notify = window.Notify.default;
    var callback;

    beforeEach(function() {
        callback = jasmine.createSpy();
    });

    it('should fire show callback', function() {
        var notification = new Notify('foo', {
            notifyShow: callback
        });
        notification.onShowNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should fire close callback', function() {
        var notification = new Notify('foo', {
            notifyClose: callback
        });
        notification.show();
        notification.onCloseNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should fire click callback', function () {
        var notification = new Notify('foo', {
            notifyClick: callback
        });
        notification.onClickNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should close if closeOnClick is set when fire click callback', function () {
        var notification = new Notify('foo', {
            notifyClick: callback,
            requireInteraction: true,
            closeOnClick: true
        });
        spyOn(notification, 'close');
        notification.onClickNotification();
        expect(callback).toHaveBeenCalled();
        expect(notification.close).toHaveBeenCalled();
    });

    it('should fire error callback', function () {
        var notification = new Notify('foo', {
            notifyError: callback
        });
        notification.show();
        notification.onErrorNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should destroy a notification once closed', function() {
        var notification = new Notify('foo', {
            notifyClose: callback
        });
        spyOn(notification, 'destroy');
        notification.onCloseNotification();
        expect(notification.destroy).toHaveBeenCalled();

    });
});

describe('timeout', function() {

    'use strict';

    var Notify = window.Notify.default;
    var clock;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
    });

    afterEach(function() {
        clock.restore();
    });

    it('should close a notification automatically', function() {
        var notification = new Notify('foo', {
            timeout: 1
        });
        spyOn(window.Notification.prototype, 'close');
        notification.show();
        expect(window.Notification.prototype.close).not.toHaveBeenCalled();
        clock.tick(1000);
        expect(window.Notification.prototype.close).toHaveBeenCalled();
    });

    it('should not close a notification automatically with requireInteraction', function () {
        var notification = new Notify('foo', {
            timeout: 1,
            requireInteraction: true
        });
        spyOn(window.Notification.prototype, 'close');
        notification.show();
        expect(window.Notification.prototype.close).not.toHaveBeenCalled();
        clock.tick(1000);
        expect(window.Notification.prototype.close).not.toHaveBeenCalled();
    });
});
