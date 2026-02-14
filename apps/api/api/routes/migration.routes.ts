import { Router } from 'express';
import { authenticate } from '../services/auth.service';
import { requireAdmin } from '../middleware/admin.middleware';
import * as migrationController from '../controllers/migration.controller';

const router = Router();

/**
 * @openapi
 * /migration/run:
 *   post:
 *     summary: Lancer la migration des utilisateurs (Admin uniquement)
 *     tags: [Migration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Migration démarrée
 *       403:
 *         description: Accès refusé
 */
router.post('/run', authenticate, requireAdmin, migrationController.runMigration);

/**
 * @openapi
 * /migration/status:
 *   get:
 *     summary: Récupérer le statut de la migration
 *     tags: [Migration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statut de la migration
 *       404:
 *         description: Migration non démarrée
 */
router.get('/status', authenticate, requireAdmin, migrationController.getMigrationStatus);

export default router;
