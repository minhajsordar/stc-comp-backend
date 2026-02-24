"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const data_source_1 = require("./database/data-source");
const routes_1 = __importDefault(require("./src/routes"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: 'STC API Server', version: '1.0.0' });
});
app.use('/api', routes_1.default);
const PORT = config_1.default.port;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected successfully');
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});
exports.default = app;
