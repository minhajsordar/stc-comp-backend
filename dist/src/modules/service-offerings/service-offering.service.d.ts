import { ServiceOffering } from '../../../database/entities/ServiceOffering';
import { ServiceOfferingsMasterList } from '../../../database/entities/ServiceOfferingsMasterList';
export declare class ServiceOfferingService {
    private offeringRepository;
    private masterListRepository;
    getMasterList(): Promise<ServiceOfferingsMasterList[]>;
    getBySpecialist(specialistId: string): Promise<ServiceOffering[]>;
    addToSpecialist(specialistId: string, masterListIds: string[]): Promise<ServiceOffering[]>;
    removeFromSpecialist(specialistId: string, offeringId: string): Promise<import("typeorm").DeleteResult>;
    updateSpecialistOfferings(specialistId: string, masterListIds: string[]): Promise<ServiceOffering[]>;
    createMasterItem(data: Partial<ServiceOfferingsMasterList>): Promise<ServiceOfferingsMasterList>;
}
