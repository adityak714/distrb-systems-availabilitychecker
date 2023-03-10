/* eslint-disable prettier/prettier */
import mqtt, { IClientOptions } from 'mqtt'
import { GetAppointmentQuery } from '../../Application/Queries/getAppointmentQuery';

export class MQTTController {

    constructor(private getAppointmentQuery: GetAppointmentQuery){}

    readonly options: IClientOptions = {
        port: 8883,
        host: 'cb9fe4f292fe4099ae5eeb9f230c8346.s2.eu.hivemq.cloud',
        protocol: 'mqtts',
        username: 'T2Project',
        password: 'Mamamia1234.'
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
                    try {
                        const newMessage = JSON.parse(message.toString());
                        console.log(newMessage)
                        const appointmentCommand = this.getAppointmentQuery.getAppointmentQuery(newMessage.dentistId, newMessage.date)
                        console.log((await appointmentCommand).toString())
                        const response = {
                            'response': (await appointmentCommand).toString()
                        }
                        console.log(response)
                        this.client.publish(this.responseTopic, JSON.stringify(response), {qos: 1})
                    } catch (e) {
                        console.log(e);
                    }
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
