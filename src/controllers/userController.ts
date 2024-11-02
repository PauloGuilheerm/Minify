import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User';
import User from '../entities/User';
import { validateUser, validateEmail } from './userValidations';
import { comparePasswords, hashPassword } from '../utils/hashPassword';

export const createUser = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
    const { email, password, name } = req.body;

    const user : User = {
      name,
      email,
      password
    };

    const {valid, message} = validateUser(user);

    if(!valid) {
      return res.status(400).json({ error: message });
    };

    user.password = await hashPassword(user.password);

    const newUser = await UserModel.create({
      ...user,
    });
    return res.json({ newUser });
};

export const loginUser = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if(!validateEmail(email) || !password){
      return res.status(400).json({ error: 'Invalid email or password' });
    };

    const user = await UserModel.findOne({ where: { email } });
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePasswords(password, user.password);
      
    if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
    else { 
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
      
      res.json({ token }); 
    }
};
