"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const host = 'broker.mqttdashboard.com';
const topic = 'topic/availability';
const options = {
    port: 1883,
    clientId: 'dentistimo-mqtt',
    reconnectPeriod: 1000
};
const client = mqtt_1.default.connect(host, options);
const message = '{"userid": 12345, "requestid" : 13, "dentistid" : 1, "issuance": 1602406766314, "date": "2020-12-14"}';
client.on('connect', () => {
    console.log('Connected');
    while (client.connected) {
        client.publish(topic, message, { qos: 0 }, function (err) {
            if (err) {
                console.log("An error occurred during publish");
            }
            else {
                console.log("Published successfully to " + topic.toString() + "with message " + message.toString());
            }
        });
    }
});
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
