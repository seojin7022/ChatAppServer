import express from 'express';

import { getUser, getAllUserChats } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/user', isAuthenticated, getUser);
    router.get('/user/chats', isAuthenticated, getAllUserChats);
}