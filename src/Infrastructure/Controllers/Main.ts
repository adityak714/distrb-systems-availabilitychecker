import {MQTTController} from './MQTTController';

export class Main {
  constructor(private mqttController: MQTTController) {
    console.log('wORKING');
    this.mqttController.subscribe();
  }
}
