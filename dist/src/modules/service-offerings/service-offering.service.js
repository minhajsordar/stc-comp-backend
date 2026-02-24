"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOfferingService = void 0;
const data_source_1 = require("../../../database/data-source");
const ServiceOffering_1 = require("../../../database/entities/ServiceOffering");
const ServiceOfferingsMasterList_1 = require("../../../database/entities/ServiceOfferingsMasterList");
class ServiceOfferingService {
    constructor() {
        this.offeringRepository = data_source_1.AppDataSource.getRepository(ServiceOffering_1.ServiceOffering);
        this.masterListRepository = data_source_1.AppDataSource.getRepository(ServiceOfferingsMasterList_1.ServiceOfferingsMasterList);
    }
    async getMasterList() {
        return this.masterListRepository.find({
            order: { title: 'ASC' },
        });
    }
    async getBySpecialist(specialistId) {
        return this.offeringRepository.find({
            where: { specialist_id: specialistId },
            relations: ['service_offerings_master'],
        });
    }
    async addToSpecialist(specialistId, masterListIds) {
        const offerings = masterListIds.map(masterId => this.offeringRepository.create({
            specialist_id: specialistId,
            service_offerings_master_list_id: masterId,
        }));
        return this.offeringRepository.save(offerings);
    }
    async removeFromSpecialist(specialistId, offeringId) {
        return this.offeringRepository.delete({
            id: offeringId,
            specialist_id: specialistId,
        });
    }
    async updateSpecialistOfferings(specialistId, masterListIds) {
        await this.offeringRepository.delete({ specialist_id: specialistId });
        if (masterListIds.length === 0)
            return [];
        const offerings = masterListIds.map(masterId => this.offeringRepository.create({
            specialist_id: specialistId,
            service_offerings_master_list_id: masterId,
        }));
        return this.offeringRepository.save(offerings);
    }
    async createMasterItem(data) {
        const item = this.masterListRepository.create(data);
        return this.masterListRepository.save(item);
    }
}
exports.ServiceOfferingService = ServiceOfferingService;
