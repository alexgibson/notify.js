describe('instantiation', function () {

    it('should create a new Notify instance', function () {
        var notification = new Notify('foo');
        expect(notification instanceof Notify).toBeTruthy();
    });

    it('should throw an exception if has no title', function () {
        expect(function () {
            var notification = new Notify();
        }).toThrow();
    });
});

describe('permission', function () {

    it('should request permission from the user', function () {
        var notification = new Notify('foo');
        spyOn(window.Notification, 'requestPermission');
        notification.show();
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
        notification.showNotification();
        notification.onCloseNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should fire click callback', function () {
        var notification = new Notify('foo', {
            notifyClick: callback
        });
        notification.showNotification();
        notification.onClickNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should fire denied callback', function () {
        var notification = new Notify('foo', {
            permissionDenied: callback
        });
        notification.showNotification();
        notification.onPermissionDenied();
        expect(callback).toHaveBeenCalled();
    });

    it('should fire error callback', function () {
        var notification = new Notify('foo', {
            notifyError: callback
        });
        notification.showNotification();
        notification.onErrorNotification();
        expect(callback).toHaveBeenCalled();
    });

    it('should call destroy', function () {
        var notification = new Notify('foo', {
            notifyClose: callback
        });
        spyOn(notification, 'destroy');
        notification.onCloseNotification();
        expect(notification.destroy).toHaveBeenCalled();

    });
});

describe('isSupported', function () {

    it('should return a boolean', function () {
        var notification = new Notify('foo');
        expect(notification.isSupported()).toBe(true);
    });
});
