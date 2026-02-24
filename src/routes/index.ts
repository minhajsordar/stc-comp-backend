import { Router } from 'express';
import specialistRoutes from '../modules/specialists/specialist.routes';
import serviceOfferingRoutes from '../modules/service-offerings/service-offering.routes';
import mediaRoutes from '../modules/media/media.routes';

const router = Router();

router.use('/specialists', specialistRoutes);
router.use('/service-offerings', serviceOfferingRoutes);
router.use('/media', mediaRoutes);

export default router;
