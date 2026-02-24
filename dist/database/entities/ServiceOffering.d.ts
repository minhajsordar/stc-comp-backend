import { Specialist } from './Specialist';
import { ServiceOfferingsMasterList } from './ServiceOfferingsMasterList';
export declare class ServiceOffering {
    id: string;
    specialist_id: string;
    service_offerings_master_list_id: string;
    created_at: Date;
    updated_at: Date;
    specialist: Specialist;
    service_offerings_master: ServiceOfferingsMasterList;
}
