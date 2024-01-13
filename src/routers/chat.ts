import express from 'express';

import { chat, createChat } from '../controllers/chat';

export default (router: express.Router) => {
    router.get('/db/chat/:id', chat);
    router.post('/db/createChat', createChat);
};