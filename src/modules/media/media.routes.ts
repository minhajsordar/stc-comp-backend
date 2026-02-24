import { Router } from 'express';
import { MediaController } from './media.controller';
import { upload } from '../../config/upload';

const router = Router();
const controller = new MediaController();

router.get('/specialist/:specialistId', controller.getBySpecialist);
router.get('/file/:id', controller.getFile);
router.post('/upload/:specialistId', upload.single('file'), controller.upload);
router.post('/', controller.create);
router.put('/specialist/:specialistId/order', controller.updateOrder);
router.delete('/:id', controller.delete);

export default router;
