describe('instantiation', function () {

    it('should create a new Notify instance', function () {
        var notification = new Notify('foo');
        expect(notification instanceof window.Notify).toBeTruthy();
    });

    it('should throw an exception if has no title', function () {
        expect(function () {
            var notification = new Notify();
        }).toThrow();
    });
});

describe('permission', function () {

    it('should check if permission is needed', function () {
        expect(typeof Notify.needsPermission).toBe('boolean');
    });

    it('should request permission from the user', function () {
        spyOn(window.Notification, 'requestPermission');
        Notify.requestPermission();
        expect(window.Notification.requestPermission).toHaveBeenCalled();
    });

    it('should update Notify.needsPermission to false if the user accepts the request', function () {
        spyOn(window.Notification, 'requestPermission').andCallFake(function (cb) {
            cb('granted');
        });

        runs(Notify.requestPermission);

        waitsFor(function () {
            return Notify.needsPermission === false;
        }, 'Notify.needsPermission to be false', 750);

        runs(function () {
            expect(Notify.needsPermission).toBe(false);
        });
    });
});

describe('callbacks', function () {

    var callback;

    beforeEach(function() {
        callback = jasmine.createSpy();
    });

    it('should fire show callback', function () {
        var notification = new Notify('foo', {
            notifyShow: callback
        });
        notification.onShowNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should fire close callback', function () {
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

    it('should fire error callback', function () {
        var notification = new Notify('foo', {
            notifyError: callback
        });
        notification.show();
        notification.onErrorNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should destroy a notification once closed', function () {
        var notification = new Notify('foo', {
            notifyClose: callback
        });
        spyOn(notification, 'destroy');
        notification.onCloseNotification();
        expect(notification.destroy).toHaveBeenCalled();

    });
});

describe('timeout', function () {

    beforeEach(function () {
        jasmine.Clock.useMock();
    });

    it('should close a notification automatically', function () {
        var notification = new Notify('foo', {
            timeout: 1
        });
        spyOn(window.Notification.prototype, 'close');
        notification.show();
        expect(window.Notification.prototype.close).not.toHaveBeenCalled();
        jasmine.Clock.tick(1000);
        expect(window.Notification.prototype.close).toHaveBeenCalled();
    });
});
