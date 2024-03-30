// chat.controller.ts
import { Controller, Post, Param, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':id/newMessage') // endpoint ajusté
  async sendMessage(@Param('id') id: string, @Body('text') text: string) { // Utiliser 'text' au lieu de 'message'
    try {
      await this.chatService.sendMessage(id, text); // Utiliser 'text' au lieu de 'message'
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send message', error };
    }
  }
}
