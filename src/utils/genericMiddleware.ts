import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';

export const applyAuthMiddleware = (router: express.Router, route: string, method: 'get' | 'post' | 'put' | 'delete' | 'patch', handler: express.RequestHandler, isProtected: boolean) => {
    router[method](route, (req, res, next) => authMiddleware(req, res, next, isProtected), handler);
};
