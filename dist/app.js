'use strict';

var _mongodb = require('./mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _next = require('next');

var _next2 = _interopRequireDefault(_next);

var _socket = require('socket.io-redis');

var _socket2 = _interopRequireDefault(_socket);

var _socket3 = require('socket.io');

var _socket4 = _interopRequireDefault(_socket3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dev = process.env.NODE_ENV !== 'production';
var nextApp = (0, _next2.default)({ dev: dev });
var handle = nextApp.getRequestHandler();
var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var io = (0, _socket4.default)(server);

io.adapter((0, _socket2.default)({ host: 'localhost', port: 6379 }));

var chat = io.of('/chat');

chat.on('connection', function (socket) {
    var name = void 0;
    socket.on('chat message', function (data) {
        var id = socket.id;
        var messages = new _mongodb2.default();
        messages.name = data.name;
        messages.message = data.message;
        messages.date = Date.now();
        messages.save().then(function (messages) {
            chat.to(id).emit('my message', messages);
            socket.broadcast.emit('broad message', messages);
        });
        console.log(data);
    });

    socket.on('personal', function (data) {
        var id = socket.id;
        console.log(data);
        chat.to(id).emit('mes', data);
    });

    socket.on('broadcast', function (data) {
        socket.broadcast.emit('mes', data);
    });

    socket.on('deleteDB', function () {
        _mongodb2.default.remove().then(function () {
            socket.emit('db drop');
            socket.broadcast.emit('db drop');
        });
    });
});

nextApp.prepare().then(function () {
    app.get('*', function (req, res) {
        return handle(req, res);
    });

    server.listen(3000, function () {
        console.log('listening on *:3000');
    });
}).catch(function (ex) {
    console.error(ex.stack);
    process.exit(1);
});