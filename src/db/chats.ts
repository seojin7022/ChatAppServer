import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    records: [{ time: { type: mongoose.Schema.Types.Date }, chatting: {type: String}, user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} }],
    lastRecord: {
        time: { type: mongoose.Schema.Types.Date },
        chatting: { type: String, default: "" },
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    count: {type: Number, default: 0}
});

export const ChatModel = mongoose.model('Chat', ChatSchema);

export const getChatFromId = (id: string) => {
    return ChatModel.findOne({ _id: id });
}

export const makeChat = async (users: object[]) => {
    
    return new ChatModel({users}).save().then((chat) => chat.toObject());
}