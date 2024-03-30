import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { MyWebSocketGateway } from 'src/mywebsocket.gateway';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'users', schema: UserSchema}]),UtilisateurModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, UtilisateurService, MyWebSocketGateway],
})
export class ChatModule {}
