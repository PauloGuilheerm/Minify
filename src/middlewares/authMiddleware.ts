import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../entities/User';

export const authMiddleware = async (req: Request<any, any, any, any> & { user?: User }, res: Response, next : NextFunction, isProtected : boolean): Promise<any> => {
    try{
      const token = req.headers['authorization'];

    if (token) { 
      const bearerToken = token.split(' ')[1];

      let validate = true;

      jwt.verify(bearerToken, process.env.JWT_SECRET ?? '', (err: any, decoded: any) => {
        if (err) {
          validate = false;
          return;
        };

        req.user = decoded;
      });

      if(!validate){
        return res.status(500).json({ error: 'User not logged' });
      }
    };
    if(isProtected && token !== undefined){
      next();
    }else if (!isProtected){
      next();
    }
    }catch(err){
      return 
    }
};

export default authMiddleware;
