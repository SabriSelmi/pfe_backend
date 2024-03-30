import { Module } from '@nestjs/common';
import { BigdealService } from './bigdeal.service';
import { BigdealController } from './bigdeal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BigdealSchema } from './entities/bigdeal.entity';
import { CategorieSchema } from 'src/categorie/entities/categorie.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'categorie', schema: CategorieSchema}]),
  ],
  controllers: [BigdealController],
  providers: [BigdealService],
})
export class BigdealModule {}
