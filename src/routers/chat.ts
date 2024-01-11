import express from 'express';

import { chat } from '../controllers/chat';

export default (router: express.Router) => {
    router.post('/db/chat', chat);
};