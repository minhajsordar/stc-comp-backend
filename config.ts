import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 5005,
    databaseUrl: process.env.DATABASE_URL || '',
    nodeEnv: process.env.NODE_ENV || 'development',
}
export default config