"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceOfferingsMasterList = void 0;
const typeorm_1 = require("typeorm");
const ServiceOffering_1 = require("./ServiceOffering");
let ServiceOfferingsMasterList = class ServiceOfferingsMasterList {
};
exports.ServiceOfferingsMasterList = ServiceOfferingsMasterList;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ServiceOfferingsMasterList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ServiceOfferingsMasterList.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ServiceOfferingsMasterList.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], ServiceOfferingsMasterList.prototype, "s3_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ServiceOfferingsMasterList.prototype, "bucket_name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ServiceOfferingsMasterList.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ServiceOfferingsMasterList.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ServiceOffering_1.ServiceOffering, (serviceOffering) => serviceOffering.service_offerings_master),
    __metadata("design:type", Array)
], ServiceOfferingsMasterList.prototype, "service_offerings", void 0);
exports.ServiceOfferingsMasterList = ServiceOfferingsMasterList = __decorate([
    (0, typeorm_1.Entity)('service_offerings_master_list')
], ServiceOfferingsMasterList);
