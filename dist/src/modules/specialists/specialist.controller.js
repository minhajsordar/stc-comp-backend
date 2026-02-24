"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialistController = void 0;
const specialist_service_1 = require("./specialist.service");
class SpecialistController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                const { page = 1, limit = 10, search, status, is_draft } = req.query;
                const result = await this.specialistService.findAll({
                    page: Number(page),
                    limit: Number(limit),
                    search: search,
                    status: status,
                    is_draft: is_draft === 'true' ? true : is_draft === 'false' ? false : undefined,
                });
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch specialists', error });
            }
        };
        this.getById = async (req, res) => {
            try {
                const { id } = req.params;
                const specialist = await this.specialistService.findById(id);
                if (!specialist) {
                    return res.status(404).json({ message: 'Specialist not found' });
                }
                res.json(specialist);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch specialist', error });
            }
        };
        this.getBySlug = async (req, res) => {
            try {
                const { slug } = req.params;
                const specialist = await this.specialistService.findBySlug(slug);
                if (!specialist) {
                    return res.status(404).json({ message: 'Specialist not found' });
                }
                res.json(specialist);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch specialist', error });
            }
        };
        this.create = async (req, res) => {
            try {
                const specialist = await this.specialistService.create(req.body);
                res.status(201).json(specialist);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to create specialist', error });
            }
        };
        this.update = async (req, res) => {
            try {
                const { id } = req.params;
                const specialist = await this.specialistService.update(id, req.body);
                if (!specialist) {
                    return res.status(404).json({ message: 'Specialist not found' });
                }
                res.json(specialist);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to update specialist', error });
            }
        };
        this.publish = async (req, res) => {
            try {
                const { id } = req.params;
                const specialist = await this.specialistService.publish(id);
                if (!specialist) {
                    return res.status(404).json({ message: 'Specialist not found' });
                }
                res.json(specialist);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to publish specialist', error });
            }
        };
        this.unpublish = async (req, res) => {
            try {
                const { id } = req.params;
                const specialist = await this.specialistService.unpublish(id);
                if (!specialist) {
                    return res.status(404).json({ message: 'Specialist not found' });
                }
                res.json(specialist);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to unpublish specialist', error });
            }
        };
        this.delete = async (req, res) => {
            try {
                const { id } = req.params;
                await this.specialistService.delete(id);
                res.json({ message: 'Specialist deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to delete specialist', error });
            }
        };
        this.getPublished = async (req, res) => {
            try {
                const { page = 1, limit = 12, search, sort_by, price_min, price_max } = req.query;
                const result = await this.specialistService.findPublished({
                    page: Number(page),
                    limit: Number(limit),
                    search: search,
                    sort_by: sort_by,
                    price_min: price_min ? Number(price_min) : undefined,
                    price_max: price_max ? Number(price_max) : undefined,
                });
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to fetch published specialists', error });
            }
        };
        this.specialistService = new specialist_service_1.SpecialistService();
    }
}
exports.SpecialistController = SpecialistController;
