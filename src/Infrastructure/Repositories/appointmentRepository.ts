import {IAppointment} from '../../Domain/Intefaces/IAppointment';
import AppointmentSchema from '../Models/appointmentSchema';
import {IAppointmentRepository} from '../../Domain/Intefaces/IAppointmentRepository';

export class appointmentRepository implements IAppointmentRepository {
  async registerAppointment(newAppointment: IAppointment): Promise<unknown> {
    const appointment = AppointmentSchema.findOne({
      date: newAppointment.date,
      dentistId: newAppointment.dentistId,
    });
    if (appointment === null) {
      return await AppointmentSchema.create(newAppointment);
    }
    return null;
  }
}
