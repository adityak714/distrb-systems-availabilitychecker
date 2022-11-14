import mqtt, { IClientOptions, MqttClient } from 'mqtt';
import { createAppointmentCommand } from '../../Application/Commands/createAppointmentCommand';

export class SubscribeController {
  readonly host = 'broker.emqx.io'
  readonly topic : string = 'topic/availability'
  readonly port = '1883';
  readonly options : IClientOptions = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    reconnectPeriod: 1000
  }
  
  const connectUrl = `mqtt://${this.host}:${this.port}`
  const client: MqttClient = mqtt.connect(this.connectUrl, this.options)
  
  
  client.on('connect', () => {
    console.log('Connected')
    client.subscribe(this.topic, () => {
      console.log(`Subscribe to topic '${topic}'`)
    })
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
  })
  
}

/*const client = mqtt.connect('mqtt://test.mosquitto.org');
client.on('connect', () => {
  client.subscribe('presence', (err: Error) => {
    if (!err) {
      client.publish('presence', 'Hello mqtt');
    }
  });
});

client.on('message', (topic: string, message: string) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});

*/
// Create a client instance
/*
const client = new Paho.MQTT.Client(
  'mqtt://test.mosquitto.org',
  Number(location.port),
  'clientId'
);
//topic for subscribing
const firstTopic = 'topic/availability/#';
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// called when the client connects
const onConnect = (): void => {
  // Once a connection has been made, make a subscription and send a message.
  console.log('onConnect');
  client.subscribe(firstTopic);
};

//This function is called when the client is connected to the broker successfully
client.connect({onSuccess: onConnect});
// called when the client loses its connection
function onConnectionLost(responseObject: any) {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:' + responseObject.errorMessage);
  }
}

// Called when a message is received
//This function will have to publish a response which will contain the data retrieved from the database
function onMessageArrived(message: Paho.MQTT.Message) {
  //check if client is connected
  if (!client.isConnected) {
    console.log('Client not connected');
  }
  if (message.destinationName === firstTopic) {
      const command : createAppointmentCommand = new createAppointmentCommand();
      const appointment = JSON.parse(message.payloadString);
      command.createAppointment(appointment.userId, appointment.dentistId, appointment.issuance, appointment.date);
  }
}

*/