import { Request, Response } from 'express';
export declare class MediaController {
    private mediaService;
    constructor();
    getBySpecialist: (req: Request, res: Response) => Promise<void>;
    upload: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    create: (req: Request, res: Response) => Promise<void>;
    getFile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateOrder: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
