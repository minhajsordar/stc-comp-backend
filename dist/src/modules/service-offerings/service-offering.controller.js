"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOfferingController = void 0;
const service_offering_service_1 = require("./service-offering.service");
class ServiceOfferingController {
    constructor() {
        this.getMasterList = async (req, res) => {
            try {
                const masterList = await this.service.getMasterList();
                res.json(masterList);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch master list', error });
            }
        };
        this.getBySpecialist = async (req, res) => {
            try {
                const { specialistId } = req.params;
                const offerings = await this.service.getBySpecialist(specialistId);
                res.json(offerings);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch offerings', error });
            }
        };
        this.addToSpecialist = async (req, res) => {
            try {
                const { specialistId } = req.params;
                const { masterListIds } = req.body;
                const offerings = await this.service.updateSpecialistOfferings(specialistId, masterListIds);
                res.status(201).json(offerings);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to add offerings', error });
            }
        };
        this.removeFromSpecialist = async (req, res) => {
            try {
                const { specialistId, offeringId } = req.params;
                await this.service.removeFromSpecialist(specialistId, offeringId);
                res.json({ message: 'Offering removed successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to remove offering', error });
            }
        };
        this.createMasterItem = async (req, res) => {
            try {
                const item = await this.service.createMasterItem(req.body);
                res.status(201).json(item);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to create master item', error });
            }
        };
        this.service = new service_offering_service_1.ServiceOfferingService();
    }
}
exports.ServiceOfferingController = ServiceOfferingController;
