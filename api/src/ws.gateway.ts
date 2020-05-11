import { Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { interval } from 'rxjs';
import { Server } from 'ws';

@Injectable()
@WebSocketGateway()
export class WsGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor() {
    console.log('constructor');
    interval(1000).subscribe(() => {
      this.server.clients.forEach(client => {
        client.send(JSON.stringify({ type: 'coucou', data: 'coucou' }));
      });
    });
  }
}
