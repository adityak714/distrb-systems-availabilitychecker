import {IAppointment} from '../../Domain/Intefaces/IAppointment';
import AppointmentSchema from '../Models/appointmentSchema';
import {IAppointmentRepository} from '../../Domain/Intefaces/IAppointmentRepository';

export class appointmentRepository implements IAppointmentRepository {
  async registerAppointment(newAppointment: IAppointment): Promise<string> {
    const appointment = AppointmentSchema.findOne({
      date: newAppointment.date,
      dentistId: newAppointment.dentistId,
    });
    if (appointment === null) {
      await AppointmentSchema.create(newAppointment);
      return newAppointment.date.toDateString();
    }
    return 'none';
  }
}
