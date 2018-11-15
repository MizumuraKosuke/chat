import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    name: String,
    message: String,
    date: Date
})
 
mongoose.model('Message', MessageSchema)
mongoose.connect('mongodb://localhost/chat')

const Message = mongoose.model('Message')

export default Message