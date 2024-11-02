import express from 'express';

import {shortenUrl, editUrl, deleteUrl, urlList, accessUrl } from "../controllers/urlController";
import { applyAuthMiddleware } from "../utils/genericMiddleware";

const getShortenRoute = (router: express.Router) : void => {
/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Shorten a URL
 *     description: Endpoint to shorten a URL
 *     tags:
 *       - URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://www.example.com"
 *     responses:
 *       201:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                   example: "https://www.example.com"
 *                 shortUrl:
 *                   type: string
 *                   example: "https://short.ly/abc123"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Original URL is invalid"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating short URL"
 */
  applyAuthMiddleware(router, '/shorten', 'post', shortenUrl, false);
};

const getEditUrlRoute = (router: express.Router) : void => {
/**
 * @swagger
 * /url:
 *   patch:
 *     summary: Edit a shortened URL
 *     description: Updates the original URL associated with a shortened URL for the authenticated user.
 *     tags:
 *       - URL
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shortUrl:
 *                 type: string
 *                 description: The shortened URL to be updated.
 *                 example: "http://short.ly/abc123"
 *               newOriginalUrl:
 *                 type: string
 *                 description: The new original URL to replace the existing one.
 *                 example: "http://example.com/new-original-url"
 *     responses:
 *       200:
 *         description: URL updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "URL updated successfully"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "New original url is invalid"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not logged"
  *       404:
 *         description: URL not found or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "URL not found or does not belong to the user"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */

  applyAuthMiddleware(router, '/url', 'patch', editUrl, true);
};

const getUrlListRoute = (router: express.Router) : void => {
 /**
 * @swagger
 * /url:
 *   get:
 *     summary: Retrieve a list of shortened URLs
 *     description: This endpoint returns a list of URLs that have been shortened by the authenticated user.
 *     tags:
 *       - URL
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       access:
 *                         type: integer
 *                         example: 10
 *                       originalUrl:
 *                         type: string
 *                         example: "https://www.example.com"
 *                       shortUrl:
 *                         type: string
 *                         example: "http://shortUrl/abc123"
 *                       userId:
 *                         type: integer
 *                         example: 123
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-01T12:00:00Z"
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not authenticated"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'An unexpected error occurred'
 */


  applyAuthMiddleware(router, '/url', 'get', urlList, true);
};

const getDeleteUrlRoute = (router: express.Router) : void => {
/**
 * @swagger
 * /url:
 *   delete:
 *     summary: Delete a shortened URL
 *     description: This endpoint allows the authenticated user to delete a previously shortened URL.
 *     tags:
 *       - URL
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shortUrl:
 *                 type: string
 *                 example: "http://shortUrl/abc123"
 *     responses:
 *       200:
 *         description: URL deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "URL deleted successfully"
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is not authenticated"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ShortURL is required"
 *       404:
 *         description: URL not found or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "URL not found or does not belong to the user"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "'An unexpected error occurred'"
 */
  applyAuthMiddleware(router, '/url', 'delete', deleteUrl, true);
}

const getAccessShortenUrl = (router: express.Router) : void => {
  /**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirects the user to the original URL based on the provided short URL. Increments the access count each time the URL is accessed.
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         description: The short URL code to be used for redirection
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       400:
 *         description: Bad Request - short URL parameter is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Short URL is required and must be a valid string"
 *       404:
 *         description: URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "URL not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */

  applyAuthMiddleware(router, '/:shortUrl', 'get', accessUrl, false);
}

export const getUrlRoutes = (router: express.Router) : void => {
  getShortenRoute(router);
  getEditUrlRoute(router);
  getUrlListRoute(router);
  getDeleteUrlRoute(router);
  getAccessShortenUrl(router);
};