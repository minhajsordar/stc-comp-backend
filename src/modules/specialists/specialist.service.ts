import { AppDataSource } from '@/database/data-source';
import { Specialist, VerificationStatus } from '@/database/entities/Specialist';
import { Like, ILike } from 'typeorm';

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

export class SpecialistService {
    private specialistRepository = AppDataSource.getRepository(Specialist);

    async findAll(params: FindAllParams) {
        const { page, limit, search, status, is_draft } = params;
        const skip = (page - 1) * limit;

        const queryBuilder = this.specialistRepository
            .createQueryBuilder('specialist')
            .leftJoinAndSelect('specialist.media', 'media')
            .leftJoinAndSelect('specialist.service_offerings', 'service_offerings')
            .leftJoinAndSelect('service_offerings.service_offerings_master', 'master');

        if (search) {
            queryBuilder.andWhere('specialist.title ILIKE :search', { search: `%${search}%` });
        }

        if (status) {
            queryBuilder.andWhere('specialist.verification_status = :status', { status });
        }

        if (is_draft !== undefined) {
            queryBuilder.andWhere('specialist.is_draft = :is_draft', { is_draft });
        }

        queryBuilder.orderBy('specialist.created_at', 'DESC');
        queryBuilder.skip(skip).take(limit);

        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findPublished(params: FindPublishedParams) {
        const { page, limit, search, sort_by, price_min, price_max } = params;
        const skip = (page - 1) * limit;

        const queryBuilder = this.specialistRepository
            .createQueryBuilder('specialist')
            .leftJoinAndSelect('specialist.media', 'media')
            .where('specialist.is_draft = :is_draft', { is_draft: false });

        if (search) {
            queryBuilder.andWhere('specialist.title ILIKE :search', { search: `%${search}%` });
        }

        if (price_min !== undefined) {
            queryBuilder.andWhere('specialist.final_price >= :price_min', { price_min });
        }

        if (price_max !== undefined) {
            queryBuilder.andWhere('specialist.final_price <= :price_max', { price_max });
        }

        if (sort_by === 'price_asc') {
            queryBuilder.orderBy('specialist.final_price', 'ASC');
        } else if (sort_by === 'price_desc') {
            queryBuilder.orderBy('specialist.final_price', 'DESC');
        } else if (sort_by === 'rating') {
            queryBuilder.orderBy('specialist.average_rating', 'DESC');
        } else {
            queryBuilder.orderBy('specialist.created_at', 'DESC');
        }

        queryBuilder.skip(skip).take(limit);

        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: string) {
        return this.specialistRepository.findOne({
            where: { id },
            relations: ['media', 'service_offerings', 'service_offerings.service_offerings_master'],
        });
    }

    async findBySlug(slug: string) {
        return this.specialistRepository.findOne({
            where: { slug },
            relations: ['media', 'service_offerings', 'service_offerings.service_offerings_master'],
        });
    }

    async create(data: Partial<Specialist>) {
        const slug = this.generateSlug(data.title || '');
        const specialist = this.specialistRepository.create({
            ...data,
            slug,
            is_draft: true,
            verification_status: VerificationStatus.PENDING,
        });
        return this.specialistRepository.save(specialist);
    }

    async update(id: string, data: Partial<Specialist>) {
        const specialist = await this.findById(id);
        if (!specialist) return null;

        if (data.title && data.title !== specialist.title) {
            data.slug = this.generateSlug(data.title);
        }

        Object.assign(specialist, data);
        return this.specialistRepository.save(specialist);
    }

    async publish(id: string) {
        const specialist = await this.findById(id);
        if (!specialist) return null;

        specialist.is_draft = false;
        return this.specialistRepository.save(specialist);
    }

    async unpublish(id: string) {
        const specialist = await this.findById(id);
        if (!specialist) return null;

        specialist.is_draft = true;
        return this.specialistRepository.save(specialist);
    }

    async delete(id: string) {
        return this.specialistRepository.softDelete(id);
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            + '-' + Date.now().toString(36);
    }
}
