// Create a client instance
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

const publishMessage = (message: string, topic: string): void => {
  if (!client.isConnected) {
    console.log('Client is not connected');
  }
  const mqttMessage = new Paho.MQTT.Message(message);
  mqttMessage.destinationName = topic;
  client.send(mqttMessage);
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
    publishMessage('data from the database', message.destinationName);
  }
}
