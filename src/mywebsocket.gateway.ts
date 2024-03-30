
import { Injectable } from '@nestjs/common';
import { UtilisateurService } from './utilisateur/utilisateur.service';
import { Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from './auth/guards/accesstoken.guard';
import { Request } from 'express';
import { SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
export class MyWebSocketGateway {
  constructor(private readonly userService: UtilisateurService) {}

  @WebSocketServer() server: Server;

  handleConnection(client) {
    console.log('New client connected with ID:', client.id);
    const userId = client.request?.user?.id;
    if (userId) {
      this.userService.updateUserSocket(userId, client.id);
    } else {
      console.log("Unable to retrieve user ID from client request.");
    }
  }

  @UseGuards(AccessTokenGuard)
  @SubscribeMessage('message')
  async handleMessage(@Req() req: Request, client: any, payload: any): Promise<void> {
    try {
      const userId = req.user['sub'];
      console.log("Identifiant utilisateur:", userId);
      const socketId = await this.userService.getSocketIdByUserId(userId);
      console.log(socketId);
      if (socketId) {
        this.server.emit('message', payload);
      } else {
        console.log(`Le socketId pour l'utilisateur avec l'ID ${userId} n'a pas été trouvé.`);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to handle message');
    }
  }
}
