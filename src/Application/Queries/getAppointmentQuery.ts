/* eslint-disable prettier/prettier */
import { IAppointmentRepository } from '../../Domain/Intefaces/IAppointmentRepository';

export class GetAppointmentQuery {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  public async getAppointmentQuery(dentistId: string, date: string): Promise<string> {
    const newAppointment =  await this.appointmentRepository.getAppointment(Number(dentistId), new Date(date));
    console.log(date)
    if (newAppointment === null){
      return 'yes';
    }
    return 'no';
  }
}
