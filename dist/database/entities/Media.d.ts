import { Specialist } from './Specialist';
export declare enum MimeType {
    IMAGE_JPEG = "image/jpeg",
    IMAGE_PNG = "image/png",
    IMAGE_GIF = "image/gif",
    IMAGE_WEBP = "image/webp",
    VIDEO_MP4 = "video/mp4",
    VIDEO_WEBM = "video/webm",
    APPLICATION_PDF = "application/pdf"
}
export declare enum MediaType {
    IMAGE = "image",
    VIDEO = "video",
    DOCUMENT = "document"
}
export declare class Media {
    id: string;
    specialist_id: string;
    file_name: string;
    file_size: number;
    display_order: number;
    mime_type: MimeType;
    media_type: MediaType;
    uploaded_at: Date;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
    specialist: Specialist;
}
