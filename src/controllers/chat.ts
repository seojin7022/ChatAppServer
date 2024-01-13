import express from 'express'
import {getChatFromId, makeChat} from '../db/chats'
import { getUserById } from '../db/users';

export const chat = (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            console.log("The id is undefined");
            return res.sendStatus(403);
        }

        const chat = getChatFromId(id);

        if (!chat) {
            console.log("The id doesn't exist");
            return res.sendStatus(403);
        }

        return res.status(200).json(chat).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}

export const createChat = async (req: express.Request, res: express.Response) => {
    try {
        const { users, name } = req.body;
        
        const chat = await makeChat(users);
        users.map(async (userId: any) => {
            const user = await getUserById(userId);
            user.chats.push({name, chatId: chat._id});
            await user.save()
        })
        
        return res.status(200).json(chat).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}