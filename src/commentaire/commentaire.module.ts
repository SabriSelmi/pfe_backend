import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentaireSchema } from './entities/commentaire.entity';
import { UserSchema } from 'src/utilisateur/entities/utilisateur.entity';
import { AnnonceSchema } from 'src/annonce/entities/annonce.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'commentaire', schema: CommentaireSchema}, {name:'users', schema: UserSchema}, {name:'annonce', schema: AnnonceSchema}]),
  ],
  controllers: [CommentaireController],
  providers: [CommentaireService],
})
export class CommentaireModule {}
