import { Router } from 'express';
import { shortenUrl, editUrl, deleteUrl, urlList, accessUrl } from '../controllers/urlController';
import { createUser, loginUser } from '../controllers/userController';
import { applyAuthMiddleware } from '../utils/genericMiddleware';

const router = Router();

// URL ROUTES
applyAuthMiddleware(router, '/shorten', 'post', shortenUrl, false);
applyAuthMiddleware(router, '/:shortUrl', 'get', accessUrl, false);
applyAuthMiddleware(router, '/url/edit', 'patch', editUrl, true);
applyAuthMiddleware(router, '/url/list', 'get', urlList, true);
applyAuthMiddleware(router, '/url', 'delete', deleteUrl, true);

// USER ROUTES
applyAuthMiddleware(router, '/createuser', 'post', createUser, false);
applyAuthMiddleware(router, '/login', 'post', loginUser, false);

export default router;
