import mongoose, {Schema} from 'mongoose';
import {IAppointment} from '../../Domain/Intefaces/IAppointment';

const appointmentSchema: Schema = new Schema({
  userId: {type: Number, required: true, unique: true},
  requestId: {type: Number, required: true, unique: true},
  dentistId: {type: Number, required: true, unique: true},
  issuance: {type: Number, required: true, unique: true},
  date: {type: Date, required: true, unique: true},
});

export default mongoose.model<IAppointment>('Appointment', appointmentSchema);
