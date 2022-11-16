/* eslint-disable prettier/prettier */
import { IAppointmentRepository } from '../../Domain/Intefaces/IAppointmentRepository';

export class CheckAvailabilityQuery {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  public async checkAvailability(dentistId: string, date: string): Promise<boolean> {
    const newAppointment =  this.appointmentRepository.getAppointment(Number(dentistId), new Date(date));
    if (newAppointment === null){
      return true;
    }
    return false;
  }
}
