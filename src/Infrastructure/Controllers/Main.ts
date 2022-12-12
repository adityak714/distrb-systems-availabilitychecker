/* eslint-disable prettier/prettier */
import {GetAppointmentQuery} from '../../Application/Queries/getAppointmentQuery';
import {appointmentRepository} from '../Repositories/appointmentRepository';
import {MQTTController} from './MQTTController';
import mongoose from 'mongoose';
import {GetInventoryQuery} from '../../Application/Queries/getInventoryQuery';

mongoose.connect(
  'mongodb+srv://gusreinaos:4MNbebz6E04hq5IV@cluster0.x1srwma.mongodb.net/test'
);
const repository = new appointmentRepository();
const command = new GetAppointmentQuery(repository);
const command2 = new GetInventoryQuery(repository);
new MQTTController(command, command2).connect();
