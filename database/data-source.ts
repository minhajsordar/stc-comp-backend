import { DataSource } from 'typeorm';
import config from '@/config';
import { Specialist } from '@/database/entities/Specialist';
import { Media } from '@/database/entities/Media';
import { PlatformFee } from '@/database/entities/PlatformFee';
import { ServiceOfferingsMasterList } from '@/database/entities/ServiceOfferingsMasterList';
import { ServiceOffering } from '@/database/entities/ServiceOffering';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: config.databaseUrl,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: config.nodeEnv === 'development',
    logging: config.nodeEnv === 'development',
    entities: [
        Specialist,
        Media,
        PlatformFee,
        ServiceOfferingsMasterList,
        ServiceOffering,
    ],
    migrations: ['database/migrations/*.ts'],
    subscribers: [],
});
