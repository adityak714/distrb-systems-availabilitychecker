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
const message: string= '{"userid": 12345, "requestid" : 13, "dentistid" : 1, "issuance": 1602406766314, "date": "2020-12-14"}';
  
client.on('connect', () => {
console.log('Connected')
  while (client.connected) {
    client.publish(topic, message, {qos: 0}, function (err) {
      if (err) {
          console.log("An error occurred during publish")
      } else {
          console.log("Published successfully to " + topic.toString() + "with message " + message.toString())
      }
  });
  }
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
