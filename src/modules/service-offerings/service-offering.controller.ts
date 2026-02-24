import { Request, Response } from 'express';
import { ServiceOfferingService } from './service-offering.service';

export class ServiceOfferingController {
    private service: ServiceOfferingService;

    constructor() {
        this.service = new ServiceOfferingService();
    }

    getMasterList = async (req: Request, res: Response) => {
        try {
            const masterList = await this.service.getMasterList();
            res.json(masterList);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch master list', error });
        }
    };

    getBySpecialist = async (req: Request, res: Response) => {
        try {
            const { specialistId } = req.params;
            const offerings = await this.service.getBySpecialist(specialistId);
            res.json(offerings);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch offerings', error });
        }
    };

    addToSpecialist = async (req: Request, res: Response) => {
        try {
            const { specialistId } = req.params;
            const { masterListIds } = req.body;
            const offerings = await this.service.updateSpecialistOfferings(specialistId, masterListIds);
            res.status(201).json(offerings);
        } catch (error) {
            res.status(500).json({ message: 'Failed to add offerings', error });
        }
    };

    removeFromSpecialist = async (req: Request, res: Response) => {
        try {
            const { specialistId, offeringId } = req.params;
            await this.service.removeFromSpecialist(specialistId, offeringId);
            res.json({ message: 'Offering removed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to remove offering', error });
        }
    };

    createMasterItem = async (req: Request, res: Response) => {
        try {
            const item = await this.service.createMasterItem(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create master item', error });
        }
    };
}
