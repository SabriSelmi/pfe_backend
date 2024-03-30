import { Module } from '@nestjs/common';
import { AdministrateurService } from './administrateur.service';
import { AdministrateurController } from './administrateur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministrateurSchema } from './entities/administrateur.entity';
import { UserSchema } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'users', schema: UserSchema}]),
  ],
  controllers: [AdministrateurController],
  providers: [AdministrateurService],
})
export class AdministrateurModule {}
