import express from 'express';

import { getAllUsers, getAllUserChats } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/user/chats', isAuthenticated, getAllUserChats);
}