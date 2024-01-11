import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    records: [{ time: { type: mongoose.Schema.Types.Date }, chatting: {type: String} }],
    lastRecord: {
        time: { type: mongoose.Schema.Types.Date },
        chatting: {type: String}
    }
});

export const ChatModel = mongoose.model('Chat', ChatSchema);

export const getChatsFromUser = (user: mongoose.Types.ObjectId) => {
    return ChatModel.find({ users: { $in: [user] } }).sort({'lastRecord.time': 1});
}

export const getChatFromId = (id: string) => {
    return ChatModel.find({ _id: id });
}