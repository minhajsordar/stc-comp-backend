"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialistService = void 0;
const data_source_1 = require("../../../database/data-source");
const Specialist_1 = require("../../../database/entities/Specialist");
class SpecialistService {
    constructor() {
        this.specialistRepository = data_source_1.AppDataSource.getRepository(Specialist_1.Specialist);
    }
    async findAll(params) {
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
    async findPublished(params) {
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
        }
        else if (sort_by === 'price_desc') {
            queryBuilder.orderBy('specialist.final_price', 'DESC');
        }
        else if (sort_by === 'rating') {
            queryBuilder.orderBy('specialist.average_rating', 'DESC');
        }
        else {
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
    async findById(id) {
        return this.specialistRepository.findOne({
            where: { id },
            relations: ['media', 'service_offerings', 'service_offerings.service_offerings_master'],
        });
    }
    async findBySlug(slug) {
        return this.specialistRepository.findOne({
            where: { slug },
            relations: ['media', 'service_offerings', 'service_offerings.service_offerings_master'],
        });
    }
    async create(data) {
        const slug = this.generateSlug(data.title || '');
        const specialist = this.specialistRepository.create({
            ...data,
            slug,
            is_draft: true,
            verification_status: Specialist_1.VerificationStatus.PENDING,
        });
        return this.specialistRepository.save(specialist);
    }
    async update(id, data) {
        const specialist = await this.findById(id);
        if (!specialist)
            return null;
        if (data.title && data.title !== specialist.title) {
            data.slug = this.generateSlug(data.title);
        }
        Object.assign(specialist, data);
        return this.specialistRepository.save(specialist);
    }
    async publish(id) {
        const specialist = await this.findById(id);
        if (!specialist)
            return null;
        specialist.is_draft = false;
        return this.specialistRepository.save(specialist);
    }
    async unpublish(id) {
        const specialist = await this.findById(id);
        if (!specialist)
            return null;
        specialist.is_draft = true;
        return this.specialistRepository.save(specialist);
    }
    async delete(id) {
        return this.specialistRepository.softDelete(id);
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            + '-' + Date.now().toString(36);
    }
}
exports.SpecialistService = SpecialistService;
