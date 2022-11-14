import mqtt, { IClientOptions, MqttClient } from 'mqtt';
import { createAppointmentCommand } from '../../Application/Commands/createAppointmentCommand';
const host = 'broker.mqttdashboard.com'
const topic:  string = 'topic/availability'
const options : IClientOptions = {
  port :1883,
  clientId: 'dentistimo-mqtt',
  reconnectPeriod: 1000
  }
  
const client = mqtt.connect(host, options)
  
client.on('connect', () => {
console.log('Connected')
  client.subscribe(topic, (err) => {
    if(err){
      console.log('Subscription was unsuccessful')
    }
    else {
      console.log(`Subscribe to topic '${topic}'`)
    }
    })
})
client.on('message', (topic, payload) => {
 
  console.log(`Received Message:' '${payload.toString()}`)
    //const command : createAppointmentCommand = new createAppointmentCommand();
    //const appointment = JSON.parse(payload.toString());
    //command.createAppointment(appointment.userId, appointment.dentistId, appointment.issuance, appointment.date);
 
})

client.on("error", function (error) {
  console.log("Error occurred: " + error);
});

// Notify reconnection
client.on("reconnect", function () {
  console.log("Reconnection starting");
});

// Notify offline status
client.on("offline", function () {
  console.log("Currently offline. Please check internet!");
});
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