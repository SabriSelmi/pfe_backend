import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'users', schema: UserSchema}]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
