import { Response } from "express";

/**
 * Utility function to standardize the API response format.
 *
 * @param {Response} res - The express response object.
 * @param {number} status - The HTTP status code.
 * @param {string} message - The message to be displayed.
 * @param {any} data - The data to be returned in the response.
 * @returns {Response} - The formatted express response.
 */

export const sendResponse = (res: Response, status: number, message: string, data: any = null) =>
  res.status(status).json({ status: message, response: data });
