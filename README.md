# 168h

## Goal

Create a painless web tail for containers based on logstash / fluentbit

See [the subject](./index.html) for further description.

## Backend

### Stack

name | role
------|------
filebeat | log collection - fetch logs from containers, either by mapping the docker sockets/directories to filebeat, or deploy as a kubernetes pod
logstash | centralize, parse and enrich logs
rabbitmq | access point for logs through the [topic exchange](https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchange-topic) called `logs`
flog | open source log generation tool

### Running the backend

I highly advise running each items one after the other, to ensure everything is running smooth.

1. `docker-compose up -d broker`
2. `docker-compose up -d logstash`
3. `docker-compose up -d filebeat`
4. `docker-compose up log-generator` (in order to have it in the foreground)

### How to consume logs from the broker

The Exchange is automatically created by Logstash at startup time, based on the 

- Connect to RabbitMQ
- Create a Queue (_NOTE: define if queue have to be exclusive and/or durable_)
- Bind your Queue to the Exchange, specify if needed a *routing key*
- Consume the messages from your Queue


## Logs

### Schema

See the [log schema](./log-schema.md).
