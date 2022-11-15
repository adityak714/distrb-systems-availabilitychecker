/* eslint-disable prettier/prettier */
import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  setInterval(() => {
    const random = Math.random() * 50;
    console.log(random);
    if (random < 30) {
      client.publish('PradeepKumar', 'Simple MQTT using HiveMQ: ' + random.toString() + '.');
    }
  }),30000;
});
