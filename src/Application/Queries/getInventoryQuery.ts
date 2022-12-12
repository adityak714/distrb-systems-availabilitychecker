/* eslint-disable prettier/prettier */
import { IAppointmentRepository } from '../../Domain/Intefaces/IAppointmentRepository';

export class GetInventoryQuery {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  public async getInventoryQuery(dentistId: string): Promise<string> {
    const newAppointment =  await this.appointmentRepository.getAppointments(Number(dentistId));
    return JSON.stringify(newAppointment);
  }
}
