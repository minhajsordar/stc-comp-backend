import { Request, Response } from 'express';
import { MediaService } from './media.service';
import path from 'path';
import fs from 'fs';

export class MediaController {
    private mediaService: MediaService;

    constructor() {
        this.mediaService = new MediaService();
    }

    getBySpecialist = async (req: Request, res: Response) => {
        try {
            const { specialistId } = req.params;
            const media = await this.mediaService.getBySpecialist(specialistId);
            res.json(media);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch media', error });
        }
    };

    upload = async (req: Request, res: Response) => {
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
                mime_type: file.mimetype as any,
                media_type: mediaType as any,
            });

            res.status(201).json(media);
        } catch (error) {
            res.status(500).json({ message: 'Failed to upload media', error });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const media = await this.mediaService.create(req.body);
            res.status(201).json(media);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create media', error });
        }
    };

    getFile = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const media = await this.mediaService.getById(id);

            if (!media) {
                return res.status(404).json({ message: 'Media not found' });
            }

            const filePath = path.join(process.cwd(), 'uploads', media.file_name);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'File not found' });
            }

            res.setHeader('Content-Type', media.mime_type);
            res.sendFile(filePath);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get file', error });
        }
    };

    updateOrder = async (req: Request, res: Response) => {
        try {
            const { specialistId } = req.params;
            const { mediaOrder } = req.body;
            await this.mediaService.updateOrder(specialistId, mediaOrder);
            res.json({ message: 'Media order updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update media order', error });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.mediaService.delete(id);
            res.json({ message: 'Media deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete media', error });
        }
    };
}
