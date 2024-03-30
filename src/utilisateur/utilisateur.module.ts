import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/utilisateur.entity';
import { AdministrateurSchema } from 'src/administrateur/entities/administrateur.entity';
import { ClientSchema } from 'src/client/entities/client.entity';
import { VendeurSchema } from 'src/vendeur/entities/vendeur.entity';
import { MyWebSocketGateway } from 'src/mywebsocket.gateway';
import { MyWebSocketGatewayModule } from 'src/gateway.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'users', schema: UserSchema, discriminators: [
      { name: 'administrateur', schema: AdministrateurSchema },
      { name: 'client', schema: ClientSchema },
      { name: 'vendeur', schema: VendeurSchema } 
    ]}]), MyWebSocketGatewayModule
  ],
  controllers: [UtilisateurController],
  providers: [UtilisateurService, MyWebSocketGateway],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}
