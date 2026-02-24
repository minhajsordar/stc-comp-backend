"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config"));
const Specialist_1 = require("../database/entities/Specialist");
const Media_1 = require("../database/entities/Media");
const PlatformFee_1 = require("../database/entities/PlatformFee");
const ServiceOfferingsMasterList_1 = require("../database/entities/ServiceOfferingsMasterList");
const ServiceOffering_1 = require("../database/entities/ServiceOffering");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: config_1.default.databaseUrl,
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: config_1.default.nodeEnv === 'development',
    logging: config_1.default.nodeEnv === 'development',
    entities: [
        Specialist_1.Specialist,
        Media_1.Media,
        PlatformFee_1.PlatformFee,
        ServiceOfferingsMasterList_1.ServiceOfferingsMasterList,
        ServiceOffering_1.ServiceOffering,
    ],
    migrations: ['database/migrations/*.ts'],
    subscribers: [],
});
