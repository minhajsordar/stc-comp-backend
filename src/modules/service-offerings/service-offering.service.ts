import { AppDataSource } from '@/database/data-source';
import { ServiceOffering } from '@/database/entities/ServiceOffering';
import { ServiceOfferingsMasterList } from '@/database/entities/ServiceOfferingsMasterList';
import { In } from 'typeorm';

export class ServiceOfferingService {
    private offeringRepository = AppDataSource.getRepository(ServiceOffering);
    private masterListRepository = AppDataSource.getRepository(ServiceOfferingsMasterList);

    async getMasterList() {
        return this.masterListRepository.find({
            order: { title: 'ASC' },
        });
    }

    async getBySpecialist(specialistId: string) {
        return this.offeringRepository.find({
            where: { specialist_id: specialistId },
            relations: ['service_offerings_master'],
        });
    }

    async addToSpecialist(specialistId: string, masterListIds: string[]) {
        const offerings = masterListIds.map(masterId => 
            this.offeringRepository.create({
                specialist_id: specialistId,
                service_offerings_master_list_id: masterId,
            })
        );
        return this.offeringRepository.save(offerings);
    }

    async removeFromSpecialist(specialistId: string, offeringId: string) {
        return this.offeringRepository.delete({
            id: offeringId,
            specialist_id: specialistId,
        });
    }

    async updateSpecialistOfferings(specialistId: string, masterListIds: string[]) {
        await this.offeringRepository.delete({ specialist_id: specialistId });
        
        if (masterListIds.length === 0) return [];

        const offerings = masterListIds.map(masterId =>
            this.offeringRepository.create({
                specialist_id: specialistId,
                service_offerings_master_list_id: masterId,
            })
        );
        return this.offeringRepository.save(offerings);
    }

    async createMasterItem(data: Partial<ServiceOfferingsMasterList>) {
        const item = this.masterListRepository.create(data);
        return this.masterListRepository.save(item);
    }
}
