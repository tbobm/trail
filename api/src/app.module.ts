import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AMQPConsumerService } from './amqp-consumer.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, AMQPConsumerService, WsGateway],
})
export class AppModule {}
