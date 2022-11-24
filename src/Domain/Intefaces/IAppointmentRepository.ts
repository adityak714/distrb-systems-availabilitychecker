import {Appointment} from '../Entities/Appointment';

export interface IAppointmentRepository {
  registerAppointment(newAppointment: Appointment): Promise<string>;
  getAppointment(dentistId: Number, date: Date): Promise<boolean>;
}
