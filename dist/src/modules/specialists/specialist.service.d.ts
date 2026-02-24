import { Specialist } from '../../../database/entities/Specialist';
interface FindAllParams {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    is_draft?: boolean;
}
interface FindPublishedParams {
    page: number;
    limit: number;
    search?: string;
    sort_by?: string;
    price_min?: number;
    price_max?: number;
}
export declare class SpecialistService {
    private specialistRepository;
    findAll(params: FindAllParams): Promise<{
        data: Specialist[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findPublished(params: FindPublishedParams): Promise<{
        data: Specialist[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findById(id: string): Promise<Specialist | null>;
    findBySlug(slug: string): Promise<Specialist | null>;
    create(data: Partial<Specialist>): Promise<Specialist>;
    update(id: string, data: Partial<Specialist>): Promise<Specialist | null>;
    publish(id: string): Promise<Specialist | null>;
    unpublish(id: string): Promise<Specialist | null>;
    delete(id: string): Promise<import("typeorm").UpdateResult>;
    private generateSlug;
}
export {};
