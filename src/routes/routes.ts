import { Router } from 'express';

import { getUrlRoutes } from './urlRoutes';
import { getUserRoutes } from './userRoutes';

const router = Router();

// URL ROUTES
getUrlRoutes(router);

// USER ROUTES
getUserRoutes(router);

export default router;
