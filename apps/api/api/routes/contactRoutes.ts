import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';
import { authenticate } from '../services/auth.service';
import { requireAdmin } from '../middleware/admin.middleware';

const router = Router();
const contactController = new ContactController();

// Public route - Submit contact form
router.post('/', (req, res) => contactController.createContact(req, res));

// Admin routes
router.get('/', authenticate, requireAdmin, (req, res) => contactController.getAllContacts(req, res));
router.get('/:id', authenticate, requireAdmin, (req, res) => contactController.getContact(req, res));
router.patch('/:id/status', authenticate, requireAdmin, (req, res) =>
  contactController.updateContactStatus(req, res)
);

export default router;
