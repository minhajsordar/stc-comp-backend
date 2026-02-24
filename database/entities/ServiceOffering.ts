import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Specialist } from './Specialist';
import { ServiceOfferingsMasterList } from './ServiceOfferingsMasterList';

@Entity('service_offerings')
@Index(['service_offerings_master_list_id'])
export class ServiceOffering {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid' })
    specialist_id!: string;

    @Column({ type: 'uuid' })
    service_offerings_master_list_id!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => Specialist, (specialist) => specialist.service_offerings)
    @JoinColumn({ name: 'specialist_id' })
    specialist!: Specialist;

    @ManyToOne(() => ServiceOfferingsMasterList, (master) => master.service_offerings)
    @JoinColumn({ name: 'service_offerings_master_list_id' })
    service_offerings_master!: ServiceOfferingsMasterList;
}
