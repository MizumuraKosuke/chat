'use strict';

var _mongodb = require('./mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _socket = require('socket.io-emitter');

var _socket2 = _interopRequireDefault(_socket);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

app.use(_express2.default.json());
app.use(_express2.default.urlencoded());
app.use(_bodyParser2.default.json());

app.use('/static', _express2.default.static('public'));

app.get('/chat', function (req, res) {
    _mongodb2.default.find(function (err, docs) {
        res.json(docs);
    });
});

server.listen(3010, function () {
    console.log('listening on *:3010');
});