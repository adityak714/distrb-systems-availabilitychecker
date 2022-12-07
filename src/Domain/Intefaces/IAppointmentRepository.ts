import {Appointment} from '../Entities/Appointment';
import {IAppointment} from './IAppointment';

export interface IAppointmentRepository {
  registerAppointment(newAppointment: Appointment): Promise<string>;
  getAppointment(dentistId: Number, date: Date): Promise<IAppointment | null>;
}
