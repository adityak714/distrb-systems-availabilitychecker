/* eslint-disable prettier/prettier */
import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  client.subscribe('PradeepKumar');
  console.log('Client has subscribed successfully');
  client.on('message', (topic,message) => {
    console.log(message.toString)
  })
});


