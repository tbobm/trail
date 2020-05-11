import { Injectable } from '@nestjs/common';
import { Channel, connect, Connection, Message } from 'amqplib';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AMQPConsumerService {
  private brokerUrl: string;
  private connection: Connection;
  private channel: Channel;
  private exchangeName = 'logs';
  private queueName: string;
  private _log$: Subject<any> = new Subject();
  public log$: Observable<any> = this._log$.asObservable();

  constructor() {
    this.brokerUrl = 'amqp://service:KOoiadscae18293@broker';
    this.queueName = `api`;
    this.initConnection();
  }

  private async initConnection() {
    this.connection = await connect(this.brokerUrl);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName, { exclusive: true });
    await this.channel.assertExchange(this.exchangeName, 'topic');
    await this.channel.bindQueue(this.queueName, this.exchangeName, '#');
    this.consume();
  }

  private consume() {
    this.channel.consume(this.queueName, (message: Message) => {
      if (message !== null && message !== undefined) {
        this.channel.ack(message);
      }
      this._log$.next(message);
    });
  }
}
