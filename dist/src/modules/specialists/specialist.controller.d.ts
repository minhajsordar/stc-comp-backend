import { Request, Response } from 'express';
export declare class SpecialistController {
    private specialistService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBySlug: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    publish: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    unpublish: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    delete: (req: Request, res: Response) => Promise<void>;
    getPublished: (req: Request, res: Response) => Promise<void>;
}
