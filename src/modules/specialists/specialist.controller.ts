import { Request, Response } from 'express';
import { SpecialistService } from './specialist.service';

export class SpecialistController {
    private specialistService: SpecialistService;

    constructor() {
        this.specialistService = new SpecialistService();
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const { page = 1, limit = 10, search, status, is_draft } = req.query;
            const result = await this.specialistService.findAll({
                page: Number(page),
                limit: Number(limit),
                search: search as string,
                status: status as string,
                is_draft: is_draft === 'true' ? true : is_draft === 'false' ? false : undefined,
            });
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch specialists', error });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const specialist = await this.specialistService.findById(id);
            if (!specialist) {
                return res.status(404).json({ message: 'Specialist not found' });
            }
            res.json(specialist);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch specialist', error });
        }
    };

    getBySlug = async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;
            const specialist = await this.specialistService.findBySlug(slug);
            if (!specialist) {
                return res.status(404).json({ message: 'Specialist not found' });
            }
            res.json(specialist);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch specialist', error });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const specialist = await this.specialistService.create(req.body);
            res.status(201).json(specialist);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create specialist', error });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const specialist = await this.specialistService.update(id, req.body);
            if (!specialist) {
                return res.status(404).json({ message: 'Specialist not found' });
            }
            res.json(specialist);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update specialist', error });
        }
    };

    publish = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const specialist = await this.specialistService.publish(id);
            if (!specialist) {
                return res.status(404).json({ message: 'Specialist not found' });
            }
            res.json(specialist);
        } catch (error) {
            res.status(500).json({ message: 'Failed to publish specialist', error });
        }
    };

    unpublish = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const specialist = await this.specialistService.unpublish(id);
            if (!specialist) {
                return res.status(404).json({ message: 'Specialist not found' });
            }
            res.json(specialist);
        } catch (error) {
            res.status(500).json({ message: 'Failed to unpublish specialist', error });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.specialistService.delete(id);
            res.json({ message: 'Specialist deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete specialist', error });
        }
    };

    getPublished = async (req: Request, res: Response) => {
        try {
            const { page = 1, limit = 12, search, sort_by, price_min, price_max } = req.query;
            const result = await this.specialistService.findPublished({
                page: Number(page),
                limit: Number(limit),
                search: search as string,
                sort_by: sort_by as string,
                price_min: price_min ? Number(price_min) : undefined,
                price_max: price_max ? Number(price_max) : undefined,
            });
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch published specialists', error });
        }
    };
}
