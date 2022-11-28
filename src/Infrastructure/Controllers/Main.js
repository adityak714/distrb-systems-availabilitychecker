"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAppointmentQuery_1 = require("../../Application/Queries/getAppointmentQuery");
const appointmentRepository_1 = require("../Repositories/appointmentRepository");
const MQTTController_1 = require("./MQTTController");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://gusreinaos:4MNbebz6E04hq5IV@cluster0.x1srwma.mongodb.net/test');
const repository = new appointmentRepository_1.appointmentRepository();
const command = new getAppointmentQuery_1.GetAppointmentQuery(repository);
new MQTTController_1.MQTTController(command).connect();
