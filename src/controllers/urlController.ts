import { Request, Response } from 'express';
import crypto from 'crypto';

import Url from '../models/Url';
import User from '../entities/User';
import { isValidURL } from '../utils/validateUrl';

export const shortenUrl = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || !isValidURL(originalUrl)) {
      return res.status(400).json({ error: 'Original URL is invalid' });
    };

    const shortUrl = crypto.randomBytes(3).toString('hex');

    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
      userId: req.user ? req.user.id : null
    });

    return res.status(201).json({
      originalUrl,
      shortUrl: `${process.env.DOMAIN}/${newUrl.shortUrl}`
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: 'Error creating short URL' });
  }
};

export const editUrl = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
  const { shortUrl, newOriginalUrl } = req.body;

  if(!req.user?.id) {
    return res.status(401).json({ error: 'User is not authenticated' });
  };

  if (!newOriginalUrl || !isValidURL(newOriginalUrl)) {
    return res.status(400).json({ error: 'New original url is invalid' });
  };
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

  if(!req.user?.id) {
    return res.status(401).json({ error: 'User is not authenticated' });
  };

  if(!shortUrl){
    return res.status(400).json({ error: 'ShortURL is required' });
  }
  const url = await Url.findOne({ where: { shortUrl, userId: req.user?.id } });

  if (!url) {
      return res.status(404).json({ error: 'URL not found or does not belong to the user' });
  }

  await url.destroy();

  return res.json({ message: 'URL deleted successfully' });
};

export const urlList = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
  if(!req.user?.id) {
    return res.status(401).json({ error: 'User is not authenticated' });
  };

  const urls = await Url.findAll({ where: { userId: req.user?.id } });
  
  const formattedUrl = urls.map((url) => ({
    ...url,
    shortUrl: `${process.env.DOMAIN}/${url.shortUrl}`
  }))
  return res.json({ list: formattedUrl});
};

export const accessUrl = async (req: Request<any, any, any, any> & { user?: User }, res: Response): Promise<any> => {
  const { shortUrl } = req.params;

  if(!shortUrl){
    return res.status(400).json({ error: 'ShortURL is required' });
  }

  const url = await Url.findOne({ where: { shortUrl } });

  if (!url) {
      return res.status(404).json({ error: 'URL not found' });
  }

  await url.update({ access: url.access + 1 });

  res.redirect(url.originalUrl);
};