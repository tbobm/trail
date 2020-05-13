# 168h

## Goal

Create a painless web tail for containers based on logstash / fluentbit

See [the subject](./index.html) for further description.

## Architecture

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggTFJcbiAgc3ViZ3JhcGggYmFja2VuZFxuICAgIEMoW0NvbnRhaW5lcl0pIC0tPnxsb2cgdG8gc3Rkb3V0L3N0ZGVycnwgQltkb2NrZXIganNvbiBsb2cgZHJpdmVyXVxuICAgIEIgLS0-fG1vdW50ZWQgbG9nIGRpcmVjdG9yaWVzfCBGW0ZpbGViZWF0XSAtLT58ZmlsZWJlYXQgaW5wdXR8IExbL0xvZ3N0YXNoL11cbiAgICBMIC0tPnxhbXFwfCBSWy9SYWJiaXRNUS9dXG4gIGVuZFxuICBzdWJncmFwaCBmcm9udGVuZFxuICAgIHN1YmdyYXBoIEFQSVxuICAgICAgUiAtLS18YW1xcHwgQVtBUEldXG4gICAgZW5kXG4gICAgQSAtLS18d3N8QzFbQ2xpZW50MV1cbiAgICBBIC0tLXx3c3xDMltDbGllbnQyXVxuICAgIEEgLS0tfHdzfEMzW0NsaWVudDNdXG4gIGVuZFxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRhcmsifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggTFJcbiAgc3ViZ3JhcGggYmFja2VuZFxuICAgIEMoW0NvbnRhaW5lcl0pIC0tPnxsb2cgdG8gc3Rkb3V0L3N0ZGVycnwgQltkb2NrZXIganNvbiBsb2cgZHJpdmVyXVxuICAgIEIgLS0-fG1vdW50ZWQgbG9nIGRpcmVjdG9yaWVzfCBGW0ZpbGViZWF0XSAtLT58ZmlsZWJlYXQgaW5wdXR8IExbL0xvZ3N0YXNoL11cbiAgICBMIC0tPnxhbXFwfCBSWy9SYWJiaXRNUS9dXG4gIGVuZFxuICBzdWJncmFwaCBmcm9udGVuZFxuICAgIHN1YmdyYXBoIEFQSVxuICAgICAgUiAtLS18YW1xcHwgQVtBUEldXG4gICAgZW5kXG4gICAgQSAtLS18d3N8QzFbQ2xpZW50MV1cbiAgICBBIC0tLXx3c3xDMltDbGllbnQyXVxuICAgIEEgLS0tfHdzfEMzW0NsaWVudDNdXG4gIGVuZFxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRhcmsifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

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
