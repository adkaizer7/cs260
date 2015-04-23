//@module

var Callback = require("modules/meta/callback");
var Promise = require("modules/meta/promise");
var Request = require("modules/meta/request");
var Test = require("modules/meta/test");
var Util = require("modules/meta/util");

/**
 * Allows cross app communication.
 */

var /*String*/ __comHandleName = 'xcomm';
var /*Application*/ __application = null;

/**
 * A link between app ids and the number of requests for connections.
 */
var /*Object*/ __connections = {};

/**
 * A link between the app ids and the array of servers that are actually
 * connected.
 */
var /*Object*/ __servers = {};

/**
 * A link between the app ids and the buffered callbacks.
 */
var /*Object*/ __buffer = {};

/**
 * A link between commands and an array of their callbacks.
 */
var /*Object*/ __commands = {};

/**
 * Initialize the library.
 */
/*void*/ exports.init = function(app) {
    // Only initialize once
    if (__application !== null) {
        return;
    }
    __application = app;

    // Server Handler
    Handler.bind('/' + __comHandleName, Object.create(Behavior.prototype, {
        onInvoke: { value:
            function(handler, message) {
                var resp = _receive(JSON.parse(message.requestText));
                message.responseText = JSON.stringify(resp);
                message.status = 200;
            },
        },
    }));

    // Client Handlers
    Handler.bind('/discover', Object.create(Behavior.prototype, {
        onInvoke: { value:
            function(handler, message) {
                var discovery = JSON.parse(message.requestText);
                __servers[discovery.id].push(discovery);
                if (__buffer[discovery.id].length > 0) {
                    for (var i in __buffer[discovery.id]) {
                        var c = __buffer[discovery.id][i];
                        var p = _send(discovery.id, c.command, c.data);
                        p.then(
                            Callback.make(c.defer.resolve, c.defer),
                            Callback.make(c.defer.reject, c.defer)
                        );
                    }
                }
                __buffer[discovery.id] = [];
            },
        },
    }));
    Handler.bind('/forget', Object.create(Behavior.prototype, {
        onInvoke: { value:
            function(handler, message) {
                var discovery = JSON.parse(message.requestText);
                var s = __servers[discovery.id];
                for (var i in s) {
                    if (s[i].uuid === discovery.uuid) {
                        s.splice(i, 1);
                        break;
                    }
                }
            },
        },
    }));
};

/**
 * Enable cross app communication
 */
/*void*/ exports.enableDiscovery = function() {
    if (!__application.shared) {
        __application.shared = true;
    }
};

/**
 * Allows discovery of the apps with the id.
 */
/*void*/ exports.connect = function(id) {
    if (id in __connections) {
        __connections[id] += 1;
    } else {
        __connections[id] = 1;
        __servers[id] = [];
        __buffer[id] = [];
    }
    __application.discover(id);
};

/**
 * Disallows discovery of the apps with the id.
 */
/*void*/ exports.disconnect = function(id) {
    Test.invariant(
        exports.validId(id),
        'Not currently connected to id, "' + id + '".'
    );
    __connections[id] -= 1;
    __application.forget(id);
};

/**
 * Returns whether the id is currently being discovered.
 */
/*void*/ exports.validId = function(id) {
    return (id in __connections) && __connections[id] > 0;
};

/**
 * Send message. Buffered until connected.
 */
/*void*/ exports.send = function(id, command, data) {
    Test.invariant(
        exports.validId(id),
        'Not currently connected to id, "' + id + '".'
    );
    if (__servers[id].length === 0) {
        var defer = Promise.makeDeferral();
        __buffer[id].push({
            command: command,
            data: data,
            defer: defer,
        });
        return defer.getPromise();
    } else {
        return _send(id, command, data);
    }
};

/**
 * Only returns the first. How to combine?
 */
/*void*/ _send = function(id, command, data) {
    for (var i in __servers[id]) {
        var d = __servers[id][i];
        query = {};
        Util.mergeInto(query, Util.deflt(data, {}));
        query.command = command;
        url = d.url + __comHandleName;
        return Request.call(url, Message.JSON, query);
    }
}

/**
 * Receive message.
 */
/*Object*/ _receive = function(message) {
    if (message.command in __commands) {
        var ret = null;
        for (i in __commands[message.command]) {
            ret = __commands[message.command][i].call(message);
        }
        return ret;
    }
    return null;
}

/*void*/ exports.registerCommand = function(/*String*/ cmd, /*Callback*/ cb) {
    if (!(cmd in __commands)) {
        __commands[cmd] = [];
    }
    if (__commands[cmd].indexOf(cb) === -1) {
        __commands[cmd].push(cb);
    }
}

/*void*/ exports.unregisterCommand = function(/*String*/ cmd, /*Callback*/ cb) {
    Test.invariant(
        (cmd in __commands) && __commands[cmd].indexOf(cb) !== -1,
        'Callback not registered for command"' + cmd + '".'
    );
    __commands[cmd].slice(__commands[cmd].indexOf(cb), 1);
}
