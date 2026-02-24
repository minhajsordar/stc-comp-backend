import { Media } from '../../../database/entities/Media';
export declare class MediaService {
    private mediaRepository;
    getBySpecialist(specialistId: string): Promise<Media[]>;
    create(data: Partial<Media>): Promise<Media>;
    updateOrder(specialistId: string, mediaOrder: {
        id: string;
        order: number;
    }[]): Promise<void>;
    delete(id: string): Promise<import("typeorm").UpdateResult>;
    getById(id: string): Promise<Media | null>;
}
