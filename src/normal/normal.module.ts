import { Module } from '@nestjs/common';
import { NormalService } from './normal.service';
import { NormalController } from './normal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NormalSchema } from './entities/normal.entity';
import { CategorieSchema } from 'src/categorie/entities/categorie.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'categorie', schema: CategorieSchema}]),
  ],
  controllers: [NormalController],
  providers: [NormalService],
})
export class NormalModule {}
