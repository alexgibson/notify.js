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
        var notification = new Notify('foo');
        expect(notification.needsPermission()).toBeTruthy();
    });

    it('should request permission from the user', function () {
        var notification = new Notify('foo');
        spyOn(window.Notification, 'requestPermission');
        notification.requestPermission();
        expect(window.Notification.requestPermission).toHaveBeenCalled();
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

    it('should fire denied callback', function () {
        var notification = new Notify('foo', {
            permissionDenied: callback
        });
        notification.onPermissionDenied();
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

    it('should fire permission granted callback', function () {
        var notification = new Notify('foo', {
            permissionGranted: callback
        });
        notification.onPermissionGranted();
        expect(callback).toHaveBeenCalled();
    });

    it('should fire permission denied callback', function () {
        var notification = new Notify('foo', {
            permissionDenied: callback
        });
        notification.onPermissionDenied();
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

