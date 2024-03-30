import { Injectable } from '@nestjs/common';
import { MyWebSocketGateway } from 'src/mywebsocket.gateway';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Injectable()
export class ChatService {
  constructor(
    private utilisateurService: UtilisateurService, 
    private myWebSocketGateway: MyWebSocketGateway
  ) {}
 
  async sendMessage(id: string, message: string){
    try {
      const socketId = await this.utilisateurService.getSocketIdByUserId(id); 
      if (socketId) {
        this.myWebSocketGateway.server.to(socketId).emit('message', message);
      } else {
        console.log(`Le socketId pour l'utilisateur avec l'ID ${id} n'a pas été trouvé.`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  }
}
