import { AppDataSource } from '@/database/data-source';
import { Media } from '@/database/entities/Media';
import fs from 'fs';
import path from 'path';

export class MediaService {
    private mediaRepository = AppDataSource.getRepository(Media);

    async getBySpecialist(specialistId: string) {
        return this.mediaRepository.find({
            where: { specialist_id: specialistId },
            order: { display_order: 'ASC' },
        });
    }

    async create(data: Partial<Media>) {
        const maxOrder = await this.mediaRepository
            .createQueryBuilder('media')
            .where('media.specialist_id = :specialistId', { specialistId: data.specialist_id })
            .select('MAX(media.display_order)', 'maxOrder')
            .getRawOne();

        const media = this.mediaRepository.create({
            ...data,
            display_order: (maxOrder?.maxOrder || 0) + 1,
        });
        return this.mediaRepository.save(media);
    }

    async updateOrder(specialistId: string, mediaOrder: { id: string; order: number }[]) {
        const updates = mediaOrder.map(item =>
            this.mediaRepository.update(
                { id: item.id, specialist_id: specialistId },
                { display_order: item.order }
            )
        );
        await Promise.all(updates);
    }

    async delete(id: string) {
        const media = await this.mediaRepository.findOne({ where: { id } });
        if (media && media.file_name) {
            const filePath = path.join(process.cwd(), 'uploads', media.file_name);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        return this.mediaRepository.softDelete(id);
    }

    async getById(id: string) {
        return this.mediaRepository.findOne({ where: { id } });
    }
}
