/* eslint-disable prettier/prettier */
import mqtt, { IClientOptions } from 'mqtt'
import { GetAppointmentQuery } from '../../Application/Queries/getAppointmentQuery';

export class MQTTController {

    constructor(private getAppointmentQuery: GetAppointmentQuery){}

    readonly options: IClientOptions = {
        port: 8883,
        host: 'e960f016875b4c75857353c7f267d899.s2.eu.hivemq.cloud',
        protocol: 'mqtts',
        username: 'gusasarkw@student.gu.se',
        password: 'Twumasi123.'
    }

    readonly client = mqtt.connect(this.options);
    readonly requestTopic = 'availability/request';
    readonly responseTopic = 'availability/response';
    readonly editAvailabilityRequest = 'edit/availability/request'
    readonly editAvailabilityResponse = 'edit/availability/response'

    public connect() {
        this.client.on('connect', () => {
            console.log('Client is connected to the internet')
            this.client.subscribe(this.requestTopic, {qos: 1});
            this.client.subscribe(this.editAvailabilityRequest, {qos: 1});
            console.log('Client has subscribed successfully')
            this.client.on('message', async (topic, message) => {
                if(topic === this.requestTopic) {
                    const newMessage = JSON.parse(message.toString());
                    console.log(newMessage)
                    const appointmentCommand = this.getAppointmentQuery.getAppointmentQuery(newMessage.dentistId, newMessage.date)
                    console.log((await appointmentCommand).toString())
                    const response = {
                        'response': (await appointmentCommand).toString()
                    }
                    console.log(response)
                    this.client.publish(this.responseTopic, JSON.stringify(response), {qos: 1})
                }
                if(topic === this.editAvailabilityRequest) {
                    const newMessage = JSON.parse(message.toString());
                    console.log(newMessage)
                    const appointmentCommand = this.getAppointmentQuery.getAppointmentQuery(newMessage.dentistId, newMessage.date)
                    console.log((await appointmentCommand).toString())
                    const response = {
                        'response': (await appointmentCommand).toString()
                    }
                    console.log(response)
                    this.client.publish(this.editAvailabilityResponse, JSON.stringify(response), {qos: 1})
                }
                

            });
        })
    }
}
