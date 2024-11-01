import { Request, Response } from 'express';
import crypto from 'crypto';

import Url from '../models/Url';
import User from '../entities/User';

export const shortenUrl = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
    const { originalUrl } = req.body;

    const shortUrl = crypto.randomBytes(3).toString('hex');
    const newUrl = await Url.create({
      originalUrl, 
      shortUrl, 
      userId: req.user ? req.user.id : null
    });
    return res.json({ originalUrl, shortUrl: `http://localhost/${newUrl.shortUrl}` });
};

export const editUrl = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
  const { shortUrl, newOriginalUrl } = req.body;

  const url = await Url.findOne({ where: { shortUrl, userId: req.user?.id } });

  if (!url) {
      return res.status(404).json({ error: 'URL not found or does not belong to the user' });
  }

  url.originalUrl = newOriginalUrl;
  
  await url.save();

  return res.json({ message: 'URL updated successfully' });
};

export const deleteUrl = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
  const { shortUrl } = req.body;

  const url = await Url.findOne({ where: { shortUrl, userId: req.user?.id } });

  if (!url) {
      return res.status(404).json({ error: 'URL not found or does not belong to the user' });
  }

  await url.destroy();

  return res.json({ message: 'URL deleted successfully' });
};

export const urlList = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
    const urls = await Url.findAll({ where: { userId: req.user?.id } });
    
    return res.json({ list: urls});
};

export const accessUrl = async (req: Request, res: Response): Promise<any> => {
  const { shortUrl } = req.params;

  const url = await Url.findOne({ where: { shortUrl } });

  if (!url) {
      return res.status(404).json({ error: 'URL not found' });
  }

  await url.update({ access: url.access + 1 });

  res.redirect(url.originalUrl);
};