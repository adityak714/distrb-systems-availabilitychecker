"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTTController = void 0;
/* eslint-disable prettier/prettier */
const mqtt_1 = __importDefault(require("mqtt"));
class MQTTController {
    constructor(createAppointmentCommand) {
        this.createAppointmentCommand = createAppointmentCommand;
        this.options = {
            port: 8883,
            host: '80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud',
            protocol: 'mqtts',
            username: 'gusreinaos',
            password: 'Mosquitto1204!'
        };
        this.client = mqtt_1.default.connect(this.options);
        this.requestTopic = 'availability/request';
        this.responseTopic = 'availability/response';
    }
    //Publish method
    publish(topic, responseMessage) {
        this.client.on('connect', () => {
            this.client.publish(topic, responseMessage);
            console.log(topic, responseMessage);
        });
    }
    //Subscribe method
    subscribe() {
        this.client.on('error', (error) => {
            console.log(error);
        });
        this.client.on('connect', () => {
            this.client.subscribe(this.requestTopic);
            console.log('Client has subscribed successfully');
        });
        this.client.on('message', (topic, message) => __awaiter(this, void 0, void 0, function* () {
            const newMessage = JSON.parse(message.toString());
            console.log(newMessage);
            const appointmentCommand = this.createAppointmentCommand.createAppointment(newMessage.userId, newMessage.dentistId, newMessage.issuance, newMessage.date);
            this.publish(this.responseTopic, yield appointmentCommand);
        }));
    }
}
exports.MQTTController = MQTTController;
