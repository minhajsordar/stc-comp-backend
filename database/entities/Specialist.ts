import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { Media } from './Media';
import { ServiceOffering } from './ServiceOffering';

export enum VerificationStatus {
    PENDING = 'pending',
    VERIFIED = 'verified',
    REJECTED = 'rejected',
}

@Entity('specialists')
export class Specialist {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
    average_rating!: number;

    @Column({ type: 'boolean', default: true })
    is_draft!: boolean;

    @Column({ type: 'int', default: 0 })
    total_number_of_ratings!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    base_price!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    platform_fee!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    final_price!: number;

    @Column({
        type: 'enum',
        enum: VerificationStatus,
        default: VerificationStatus.PENDING,
    })
    verification_status!: VerificationStatus;

    @Column({ type: 'boolean', default: false })
    is_verified!: boolean;

    @Column({ type: 'int', default: 0 })
    duration_days!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @DeleteDateColumn()
    deleted_at!: Date | null;

    @OneToMany(() => Media, (media) => media.specialist)
    media!: Media[];

    @OneToMany(() => ServiceOffering, (serviceOffering) => serviceOffering.specialist)
    service_offerings!: ServiceOffering[];
}
