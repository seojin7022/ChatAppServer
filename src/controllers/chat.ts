import express from 'express'
import {getChatFromId} from '../db/chats'

export const chat = (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.body;

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