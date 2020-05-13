import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Channel, connect, Connection, Message } from 'amqplib';
import { Observable, Subject } from 'rxjs';

@Module({
  imports: [ConfigModule],
})

@Injectable()
export class AMQPConsumerService {
  private brokerUrl: string;
  private connection: Connection;
  private channel: Channel;
  private exchangeName: string;
  private queueName: string;
  private _log$: Subject<any> = new Subject();
  public log$: Observable<any> = this._log$.asObservable();

  constructor(private configService: ConfigService) {
    this.brokerUrl = this.configService.get<string>('BROKER_URL');
    this.exchangeName = this.configService.get<string>('EXCHANGE_NAME', 'logs');
    this.queueName = `api`;
    this.initConnection();
  }

  private async initConnection() {
    try {
      this.connection = await connect(this.brokerUrl);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
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
