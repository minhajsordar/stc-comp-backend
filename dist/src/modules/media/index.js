"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = exports.MediaController = exports.mediaRoutes = void 0;
var media_routes_1 = require("./media.routes");
Object.defineProperty(exports, "mediaRoutes", { enumerable: true, get: function () { return __importDefault(media_routes_1).default; } });
var media_controller_1 = require("./media.controller");
Object.defineProperty(exports, "MediaController", { enumerable: true, get: function () { return media_controller_1.MediaController; } });
var media_service_1 = require("./media.service");
Object.defineProperty(exports, "MediaService", { enumerable: true, get: function () { return media_service_1.MediaService; } });
