import { Module } from '@nestjs/common';
import { VendeurService } from './vendeur.service';
import { VendeurController } from './vendeur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'users', schema: UserSchema}]),
  ],
  controllers: [VendeurController],
  providers: [VendeurService],
  exports: [VendeurService],
})
export class VendeurModule {}
