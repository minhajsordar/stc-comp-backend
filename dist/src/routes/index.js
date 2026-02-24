"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialist_routes_1 = __importDefault(require("../modules/specialists/specialist.routes"));
const service_offering_routes_1 = __importDefault(require("../modules/service-offerings/service-offering.routes"));
const media_routes_1 = __importDefault(require("../modules/media/media.routes"));
const router = (0, express_1.Router)();
router.use('/specialists', specialist_routes_1.default);
router.use('/service-offerings', service_offering_routes_1.default);
router.use('/media', media_routes_1.default);
exports.default = router;
