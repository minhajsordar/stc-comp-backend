"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const media_service_1 = require("./media.service");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class MediaController {
    constructor() {
        this.getBySpecialist = async (req, res) => {
            try {
                const { specialistId } = req.params;
                const media = await this.mediaService.getBySpecialist(specialistId);
                res.json(media);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch media', error });
            }
        };
        this.upload = async (req, res) => {
            try {
                const { specialistId } = req.params;
                const file = req.file;
                if (!file) {
                    return res.status(400).json({ message: 'No file uploaded' });
                }
                const mediaType = file.mimetype.startsWith('image/')
                    ? 'image'
                    : file.mimetype.startsWith('video/')
                        ? 'video'
                        : 'document';
                const media = await this.mediaService.create({
                    specialist_id: specialistId,
                    file_name: file.filename,
                    file_size: file.size,
                    mime_type: file.mimetype,
                    media_type: mediaType,
                });
                res.status(201).json(media);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to upload media', error });
            }
        };
        this.create = async (req, res) => {
            try {
                const media = await this.mediaService.create(req.body);
                res.status(201).json(media);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to create media', error });
            }
        };
        this.getFile = async (req, res) => {
            try {
                const { id } = req.params;
                const media = await this.mediaService.getById(id);
                if (!media) {
                    return res.status(404).json({ message: 'Media not found' });
                }
                const filePath = path_1.default.join(process.cwd(), 'uploads', media.file_name);
                if (!fs_1.default.existsSync(filePath)) {
                    return res.status(404).json({ message: 'File not found' });
                }
                res.setHeader('Content-Type', media.mime_type);
                res.sendFile(filePath);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get file', error });
            }
        };
        this.updateOrder = async (req, res) => {
            try {
                const { specialistId } = req.params;
                const { mediaOrder } = req.body;
                await this.mediaService.updateOrder(specialistId, mediaOrder);
                res.json({ message: 'Media order updated successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to update media order', error });
            }
        };
        this.delete = async (req, res) => {
            try {
                const { id } = req.params;
                await this.mediaService.delete(id);
                res.json({ message: 'Media deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to delete media', error });
            }
        };
        this.mediaService = new media_service_1.MediaService();
    }
}
exports.MediaController = MediaController;
