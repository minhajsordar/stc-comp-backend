import { Router } from 'express';
import { SpecialistController } from './specialist.controller';

const router = Router();
const controller = new SpecialistController();

router.get('/', controller.getAll);
router.get('/published', controller.getPublished);
router.get('/:id', controller.getById);
router.get('/slug/:slug', controller.getBySlug);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/publish', controller.publish);
router.put('/:id/unpublish', controller.unpublish);
router.delete('/:id', controller.delete);

export default router;
