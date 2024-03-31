import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AccessTokenGuard } from 'src/auth/guards/accesstoken.guard';
import { AuthService } from 'src/auth/auth.service';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,

  ) { }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get(':id')
  // @UseGuards(AccessTokenGuard)
  findAll(@Param('id') id: string) {
 
    return this.messagesService.findAll(id);
  }
  @Get(':sender/:reciever')
  // @UseGuards(AccessTokenGuard)
  findConversation(@Param('sender') sender: string, @Param('reciever') reciever: string) {

    return this.messagesService.findConversation(sender, reciever);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
