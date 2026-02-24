import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Index,
} from 'typeorm';
import { ServiceOffering } from './ServiceOffering';

@Entity('service_offerings_master_list')
export class ServiceOfferingsMasterList {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    s3_key!: string | null;

    @Column({ type: 'varchar', length: 255 })
    bucket_name!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany(() => ServiceOffering, (serviceOffering) => serviceOffering.service_offerings_master)
    service_offerings!: ServiceOffering[];
}
