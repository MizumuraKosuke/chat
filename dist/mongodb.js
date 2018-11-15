'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var MessageSchema = new Schema({
    name: String,
    message: String,
    date: Date
});

_mongoose2.default.model('Message', MessageSchema);
_mongoose2.default.connect('mongodb://localhost/chat');

var Message = _mongoose2.default.model('Message');

exports.default = Message;