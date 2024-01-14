import express from 'express';
import mongoose from 'mongoose'

import { getUsers, getUserBySessionToken } from '../db/users';
import { getChatFromId } from '../db/chats';

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUserBySessionToken(req.cookies['JINI-AUTH']);

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
        
    }
}

interface ChatInter {
    name: string,
    chatData: object
}

export const getAllUserChats = async (req: express.Request, res: express.Response) => {
    try {
        const sessionToken: string = req.cookies['JINI-AUTH'];

        const chats: any[] = [];

        const user = await getUserBySessionToken(sessionToken)
        
        for (let item = 0; item < user.chats.length; item++) {
            chats.push({ name: user.chats[item].name, chatData: await getChatFromId(user.chats[item].chatId.toString()) });
        }

        
        chats.forEach((item) => {
            console.log(item.chatData);
            
        })
        

        return res.status(200).json(chats).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}