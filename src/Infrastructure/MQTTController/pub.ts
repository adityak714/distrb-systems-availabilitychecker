import mqtt, { IClientOptions, MqttClient } from 'mqtt';
import { createAppointmentCommand } from '../../Application/Commands/createAppointmentCommand';

const host = 'broker.emqx.io'
const topic:  string = 'topic/availability'
const port = '1883';
const options : IClientOptions = {
  clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
  reconnectPeriod: 1000
  }
  
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, options)
const message: string= '{"userid": 12345, "requestid" : 13, "dentistid" : 1, "issuance": 1602406766314, "date": "2020-12-14"}';
  
client.on('connect', () => {
console.log('Connected')
  while (client.connected) {
    client.publish(topic, message, {qos: 0}, function (err) {
      if (err) {
          console.log("An error occurred during publish")
      } else {
          console.log("Published successfully to " + topic.toString())
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
