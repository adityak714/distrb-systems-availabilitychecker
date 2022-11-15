/* eslint-disable prettier/prettier */
import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://broker.hivemq.com');

//Publish method
client.on('connect', () => {
  setInterval(() => {
    const random = Math.random() * 50;
    console.log(random);
    if (random < 30) {
      client.publish('PradeepKumar', 'Simple MQTT using HiveMQ: ' + random.toString() + '.');
    }
  }),30000;
});

//Subscribe method
client.on('connect', () => {
    client.subscribe('PradeepKumar');
    console.log('Client has subscribed successfully');
    client.on('message', (topic,message) => {
      console.log(message.toString)
    })
  });
