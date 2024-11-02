import express, { RequestHandler, Response }from 'express';
import authMiddleware from '../middlewares/authMiddleware';

export const applyAuthMiddleware = (router: express.Router,route: string, method: 'get' | 'post' | 'put' | 'delete' | 'patch', handler: RequestHandler<Response>, isProtected: boolean) => {
    router[method](route, (req, res, next) => {
      authMiddleware(req, res, next, isProtected);
    }, handler);
};