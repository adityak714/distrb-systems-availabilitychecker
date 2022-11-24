/* eslint-disable prettier/prettier */
import mqtt, { IClientOptions } from 'mqtt'
import { GetAppointmentQuery } from '../../Application/Queries/getAppointmentQuery';

export class MQTTController {

    constructor(private getAppointmentQuery: GetAppointmentQuery){}

    readonly options: IClientOptions = {
        port: 8883,
        host: '80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud',
        protocol:'mqtts',
        username: 'gusreinaos',
        password: 'Mosquitto1204!'
    }

    readonly client = mqtt.connect(this.options);
    readonly requestTopic = 'availability/request';
    readonly responseTopic = 'availability/response';

    //Publish method
    public publish(topic: string, responseMessage: string) {
        this.client.on('connect', () => {
            this.client.publish(topic, responseMessage);
            console.log(topic ,responseMessage)
        })
    }

    //Subscribe method
    public subscribe(){
        this.client.on('connect', () => {
            this.client.subscribe(this.requestTopic);
            console.log('Client has subscribed successfully');
        });
        this.client.on('message', async (topic, message) => {
            const newMessage = JSON.parse(message.toString());
            console.log(newMessage)
            const appointmentCommand = this.getAppointmentQuery.getAppointmentQuery(newMessage.dentistId, newMessage.date)
            this.publish(this.responseTopic, await appointmentCommand)
        });
    }
}



