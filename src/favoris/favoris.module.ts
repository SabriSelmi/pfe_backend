import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavorisSchema } from './entities/favoris.entity';
import { UserSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { AnnonceSchema } from 'src/annonce/entities/annonce.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'favoris', schema: FavorisSchema}, {name:'users', schema: UserSchema}, {name:'annonce', schema: AnnonceSchema}]),
  ],
  controllers: [FavorisController],
  providers: [FavorisService],
})
export class FavorisModule {}
