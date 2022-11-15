/* eslint-disable prettier/prettier */
import {Appointment} from '../../Domain/Entities/Appointment';
import { IAppointmentRepository } from '../../Domain/Intefaces/IAppointmentRepository';

export class createAppointmentCommand {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  public async createAppointment(userId: number, dentistId: number, issuance: number, date: Date): Promise<string> {
    const newAppointment = new Appointment(userId, dentistId, issuance, date);
    return await this.appointmentRepository.registerAppointment(newAppointment);
  }
}
