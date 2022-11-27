"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentQuery = void 0;
class GetAppointmentQuery {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    getAppointmentQuery(dentistId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAppointment = yield this.appointmentRepository.getAppointment(Number(dentistId), new Date(date));
            console.log(date);
            if (newAppointment === null) {
                return 'yes';
            }
            return 'no';
        });
    }
}
exports.GetAppointmentQuery = GetAppointmentQuery;
