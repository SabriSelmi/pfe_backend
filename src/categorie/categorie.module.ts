import { BigdealSchema } from './../bigdeal/entities/bigdeal.entity';
import { CategorieSchema } from './entities/categorie.entity';
import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NormalSchema } from 'src/normal/entities/normal.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'categorie', schema: CategorieSchema, discriminators: [
      { name: 'normal', schema: NormalSchema },
      { name: 'bigdeal', schema: BigdealSchema } 
    ]}]),
  ],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CategorieModule {}
