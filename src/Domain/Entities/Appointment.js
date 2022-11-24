"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
class Appointment {
    constructor(userId, dentistId, issuance, date) {
        this.userId = userId;
        this.dentistId = dentistId;
        this.issuance = issuance;
        this.date = date;
    }
}
exports.Appointment = Appointment;
