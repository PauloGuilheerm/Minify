import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../entities/User';

export const authMiddleware = async (req: Request<any, any, any, any> & { user?: User }, res: Response, next : NextFunction, isProtected : boolean): Promise<Response | undefined> => {
    try{
      const token = req.headers['authorization'];

    if (token) { 
      const bearerToken = token.split(' ')[1];

      console.log(bearerToken)
      let validate = true;

      jwt.verify(bearerToken, process.env.JWT_SECRET ?? '', (err: any, decoded: any) => {
        if (err) {
          validate = false;
          return;
        };

        req.user = decoded;
      });

      if(!validate){
        return res.status(401).json({ error: 'User not logged or invalid token' });
      }
    };
    
    if(isProtected && !token){
      return res.status(401).json({ error: 'User not logged' });
    };
    
    next();

    }catch(err){
      return res.status(500).json({ error: 'An unexpected error occurred' }); 
    }
};

export default authMiddleware;
