import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { map } from 'rxjs/operators';
import { Server } from 'ws';
import { AMQPConsumerService } from './amqp-consumer.service';

@Injectable()
@WebSocketGateway()
export class WsGateway {
  @WebSocketServer() server: Server;

  constructor(private amqpConsumerService: AMQPConsumerService) {
    this.amqpConsumerService.log$
      .pipe(map(log => log.content.toString()))
      .subscribe(log => this.sendToClients(log));
  }

  private sendToClients(log: any) {
    this.server.clients.forEach(client => {
      client.send(JSON.stringify(log));
    });
  }
}
