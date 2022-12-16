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
    constructor(getAppointmentQuery) {
        this.getAppointmentQuery = getAppointmentQuery;
        this.options = {
            port: 8883,
            host: 'e960f016875b4c75857353c7f267d899.s2.eu.hivemq.cloud',
            protocol: 'mqtts',
            username: 'gusasarkw@student.gu.se',
            password: 'Twumasi123.'
        };
        this.client = mqtt_1.default.connect(this.options);
        this.requestTopic = 'availability/request';
        this.responseTopic = 'availability/response';
        this.editAvailabilityRequest = 'edit/availability/request';
        this.editAvailabilityResponse = 'edit/availability/response';
    }
    connect() {
        this.client.on('connect', () => {
            console.log('Client is connected to the internet');
            this.client.subscribe(this.requestTopic, { qos: 1 });
            this.client.subscribe(this.editAvailabilityRequest, { qos: 1 });
            console.log('Client has subscribed successfully');
            this.client.on('message', (topic, message) => __awaiter(this, void 0, void 0, function* () {
                if (topic === this.requestTopic) {
                    const newMessage = JSON.parse(message.toString());
                    console.log(newMessage);
                    const appointmentCommand = this.getAppointmentQuery.getAppointmentQuery(newMessage.dentistId, newMessage.date);
                    console.log((yield appointmentCommand).toString());
                    const response = {
                        'response': (yield appointmentCommand).toString()
                    };
                    console.log(response);
                    this.client.publish(this.responseTopic, JSON.stringify(response), { qos: 1 });
                }
                if (topic === this.editAvailabilityRequest) {
                    const newMessage = JSON.parse(message.toString());
                    console.log(newMessage);
                    const appointmentCommand = this.getAppointmentQuery.getAppointmentQuery(newMessage.dentistId, newMessage.date);
                    console.log((yield appointmentCommand).toString());
                    const response = {
                        'response': (yield appointmentCommand).toString()
                    };
                    console.log(response);
                    this.client.publish(this.editAvailabilityResponse, JSON.stringify(response), { qos: 1 });
                }
            }));
        });
    }
}
exports.MQTTController = MQTTController;
