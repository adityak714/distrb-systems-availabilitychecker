import mqtt from 'mqtt';
const client = mqtt.connect('mqtt://test.mosquitto.org');
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
