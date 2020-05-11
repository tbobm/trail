import { Module } from '@nestjs/common';
import { AMQPConsumerService } from './amqp-consumer.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AMQPConsumerService, WsGateway],
})
export class AppModule {}
