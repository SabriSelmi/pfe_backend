import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8001, { cors: "*" })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() messageData: any): void {
    console.log(messageData);

    // Emit the received message to the receiver
    this.server.emit(`message-${messageData.reciever}`, messageData);
  }
}