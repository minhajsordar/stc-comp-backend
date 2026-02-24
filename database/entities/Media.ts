import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Specialist } from './Specialist';

export enum MimeType {
    IMAGE_JPEG = 'image/jpeg',
    IMAGE_PNG = 'image/png',
    IMAGE_GIF = 'image/gif',
    IMAGE_WEBP = 'image/webp',
    VIDEO_MP4 = 'video/mp4',
    VIDEO_WEBM = 'video/webm',
    APPLICATION_PDF = 'application/pdf',
}

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video',
    DOCUMENT = 'document',
}

@Entity('media')
export class Media {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid' })
    specialist_id!: string;

    @Column({ type: 'varchar', length: 255 })
    file_name!: string;

    @Column({ type: 'int' })
    file_size!: number;

    @Column({ type: 'int', default: 0 })
    display_order!: number;

    @Column({
        type: 'enum',
        enum: MimeType,
    })
    mime_type!: MimeType;

    @Column({
        type: 'enum',
        enum: MediaType,
    })
    media_type!: MediaType;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    uploaded_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date | null;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Specialist, (specialist) => specialist.media)
    @JoinColumn({ name: 'specialist_id' })
    specialist!: Specialist;
}
