import express from 'express';

import authentication from './authentication';
import users from './users';
import chats from './chat'

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    chats(router);
    users(router);
    return router;
}