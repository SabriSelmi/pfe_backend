import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MesssageSchema } from './entities/message.entity';
import { AccessTokenStrategy } from 'src/auth/strategie/accesstoken.strategie';
import { UserSchema } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'message', schema: MesssageSchema }, {name : "users", schema : UserSchema}]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, AccessTokenStrategy],
})
export class MessagesModule { }
