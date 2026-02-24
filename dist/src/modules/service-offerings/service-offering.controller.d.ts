import { Request, Response } from 'express';
export declare class ServiceOfferingController {
    private service;
    constructor();
    getMasterList: (req: Request, res: Response) => Promise<void>;
    getBySpecialist: (req: Request, res: Response) => Promise<void>;
    addToSpecialist: (req: Request, res: Response) => Promise<void>;
    removeFromSpecialist: (req: Request, res: Response) => Promise<void>;
    createMasterItem: (req: Request, res: Response) => Promise<void>;
}
