import { ServiceOffering } from './ServiceOffering';
export declare class ServiceOfferingsMasterList {
    id: string;
    title: string;
    description: string;
    s3_key: string | null;
    bucket_name: string;
    created_at: Date;
    updated_at: Date;
    service_offerings: ServiceOffering[];
}
