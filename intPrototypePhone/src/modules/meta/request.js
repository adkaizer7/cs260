//@module

var Callback = require("modules/meta/callback");
var Promise = require("modules/meta/promise");
var Util = require("modules/meta/util");

/**
 * Allows HTTP requests through the 'call' function.
 */

/**
 * Internal class used to create the HTTP Request.
 */
var RequestBehavior = function(content, data) {
    Behavior.call(this, content, data);
}
RequestBehavior.prototype = Object.create(Behavior.prototype, {
    /* Private members */

    _resolveCb: { value: null, writable: true },
    _rejectCb: { value: null, writable: true },

    /* Public members */

    onCreate: { value:
        function(container, data) {
            Behavior.prototype.onCreate.call(this, container);
            this._resolveCb = Util.idx(
                data,
                'resolveCb',
                Callback.emptyCallback
            );
            this._rejectCb = Util.idx(
                data,
                'rejectCb',
                Callback.emptyCallback
            );
            var message = new Message(data.url);
            if (data.data !== null) {
                message.requestText = JSON.stringify(data.data);
            }
            container.invoke(
                message,
                Util.idx(data, 'responseType', Message.TEXT)
            );
        },
    },
    onComplete: {
        value: function(application, message, response) {
            if (response !== null) {
                this._resolveCb.call(message, response);
            } else {
                this._rejectCb.call(message, response);
            }
        }
    },
});

/**
 * Internal class used to create the HTTP Request
 */
var Request = Container.template(function($) { return {
    behavior: Object.create(RequestBehavior.prototype)
}});

/**
 * Create an HTTP Request and return a promise that will be fulfilled with the
 * response.
 */
var call = function(url, responseType, data) {
    responseType = Util.deflt(responseType, Message.TEXT);
    data = Util.deflt(data, null);

    var defer = Promise.makeDeferral();
    new Request({
        resolveCb: Callback.make(defer.resolve, defer),
        rejectCb: Callback.make(defer.reject, defer),
        url: url,
        responseType: responseType,
        data: data,
    })
    return defer.getPromise();
}

exports.call = call;
