"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialistService = exports.SpecialistController = exports.specialistRoutes = void 0;
var specialist_routes_1 = require("./specialist.routes");
Object.defineProperty(exports, "specialistRoutes", { enumerable: true, get: function () { return __importDefault(specialist_routes_1).default; } });
var specialist_controller_1 = require("./specialist.controller");
Object.defineProperty(exports, "SpecialistController", { enumerable: true, get: function () { return specialist_controller_1.SpecialistController; } });
var specialist_service_1 = require("./specialist.service");
Object.defineProperty(exports, "SpecialistService", { enumerable: true, get: function () { return specialist_service_1.SpecialistService; } });
