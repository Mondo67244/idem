import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/express.interface';
import logger from '../config/logger';

/**
 * Middleware to restrict access to admin users only.
 * Checks if the authenticated user's email is in the ADMIN_EMAILS environment variable.
 */
export const requireAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  const userEmail = req.user?.email;

  // Ensure user is authenticated
  if (!req.user || !req.user.uid) {
    logger.warn('Admin access denied: User not authenticated', {
      path: req.path,
      ip: req.ip,
    });
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
    });
    return;
  }

  // Check if user is in admin list
  if (!userEmail || !adminEmails.includes(userEmail)) {
    logger.warn(`Admin access denied for user: ${userEmail || 'unknown'}`, {
      path: req.path,
      userId: req.user.uid,
    });
    res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'Admin access required' },
    });
    return;
  }

  logger.info(`Admin access granted for user: ${userEmail}`, {
    path: req.path,
    userId: req.user.uid,
  });
  next();
};
