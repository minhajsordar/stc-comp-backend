import { Router } from 'express';
import { ServiceOfferingController } from './service-offering.controller';

const router = Router();
const controller = new ServiceOfferingController();

router.get('/master-list', controller.getMasterList);
router.post('/master-list', controller.createMasterItem);
router.get('/specialist/:specialistId', controller.getBySpecialist);
router.post('/specialist/:specialistId', controller.addToSpecialist);
router.delete('/specialist/:specialistId/:offeringId', controller.removeFromSpecialist);

export default router;
