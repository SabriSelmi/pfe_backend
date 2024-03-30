import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AnnonceController } from './annonce.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnonceSchema } from './entities/annonce.entity';
import { CategorieSchema } from 'src/categorie/entities/categorie.entity';
import { ClientSchema } from 'src/client/entities/client.entity';
import { UserSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { VendeurSchema } from 'src/vendeur/entities/vendeur.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'annonce', schema: AnnonceSchema}, {name:'categorie', schema: CategorieSchema}, 
    {name:'users', schema: UserSchema}]),
  ],
  controllers: [AnnonceController],
  providers: [AnnonceService],
})
export class AnnonceModule {}
