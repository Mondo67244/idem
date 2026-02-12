import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/express.interface';
import { userService } from '../services/user.service';
import logger from '../config/logger';

/**
 * Middleware to check if the authenticated user has 'admin' role.
 * Assumes that `authenticate` middleware has already run and populated `req.user`.
 */
export async function requireAdmin(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.user?.uid;

  if (!userId) {
    logger.warn('Admin access attempt without authenticated user');
    res.status(401).json({
      success: false,
      message: 'Unauthorized: User not authenticated',
    });
    return;
  }

  try {
    const isAdmin = await userService.isUserAdmin(userId);

    if (!isAdmin) {
      logger.warn(`Admin access denied for user: ${userId}`);
      res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required',
      });
      return;
    }

    logger.info(`Admin access granted for user: ${userId}`);
    next();
  } catch (error: any) {
    logger.error(`Error in requireAdmin middleware for user ${userId}: ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: 'Internal server error checking admin permissions',
    });
  }
}
