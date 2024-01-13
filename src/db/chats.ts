import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    records: [{ time: { type: mongoose.Schema.Types.Date }, chatting: {type: String} }],
    lastRecord: {
        time: { type: mongoose.Schema.Types.Date },
        chatting: {type: String, default: ""}
    },
    count: {type: Number, default: 0}
});

export const ChatModel = mongoose.model('Chat', ChatSchema);

export const getChatFromId = (id: string) => {
    return ChatModel.find({ _id: id });
}

export const makeChat = async (users: object[]) => {
    
    return new ChatModel({users}).save().then((chat) => chat.toObject());
}