"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const data_source_1 = require("../../../database/data-source");
const Media_1 = require("../../../database/entities/Media");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class MediaService {
    constructor() {
        this.mediaRepository = data_source_1.AppDataSource.getRepository(Media_1.Media);
    }
    async getBySpecialist(specialistId) {
        return this.mediaRepository.find({
            where: { specialist_id: specialistId },
            order: { display_order: 'ASC' },
        });
    }
    async create(data) {
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
    async updateOrder(specialistId, mediaOrder) {
        const updates = mediaOrder.map(item => this.mediaRepository.update({ id: item.id, specialist_id: specialistId }, { display_order: item.order }));
        await Promise.all(updates);
    }
    async delete(id) {
        const media = await this.mediaRepository.findOne({ where: { id } });
        if (media && media.file_name) {
            const filePath = path_1.default.join(process.cwd(), 'uploads', media.file_name);
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
            }
        }
        return this.mediaRepository.softDelete(id);
    }
    async getById(id) {
        return this.mediaRepository.findOne({ where: { id } });
    }
}
exports.MediaService = MediaService;
