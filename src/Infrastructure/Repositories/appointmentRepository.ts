/* eslint-disable prettier/prettier */
import {IAppointment} from '../../Domain/Intefaces/IAppointment';
import Appointment from '../Models/appointmentSchema';
import {IAppointmentRepository} from '../../Domain/Intefaces/IAppointmentRepository';

export class appointmentRepository implements IAppointmentRepository {
  async registerAppointment(newAppointment: IAppointment): Promise<string> {
    newAppointment.date.setMinutes(0);
    newAppointment.date.setSeconds(0);
    const appointment = await Appointment.findOne({
      date: newAppointment.date,
      dentistId: newAppointment.dentistId,
    });
    console.log(appointment);
    if (appointment === null) {
      await Appointment.create(newAppointment);
      console.log(newAppointment.date);
      return newAppointment.date.toDateString();
    }
    return 'none';
  }

  async getAppointment(dentistId: Number, date: Date): Promise<IAppointment | null> {
    if (date.getMinutes() >= 0 && date.getMinutes() <= 29) {
      date.setMinutes(0);
      date.setSeconds(0);
    }
    else if (date.getMinutes() >= 30 && date.getMinutes() <= 59) {
      date.setMinutes(30);
      date.setSeconds(0);
    }
    const appointment = await Appointment.findOne({
      date: date,
      dentistId: dentistId,
    });
    if (appointment === null) {
      return null;
    }
    return appointment;
  }
}
