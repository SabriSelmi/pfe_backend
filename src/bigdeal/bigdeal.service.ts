import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBigdeal } from './interface/bigdeal.interface';
import { UpdateBigdealDto } from './dto/update-bigdeal.dto';
import { CreateBigdealDto } from './dto/create-bigdeal.dto';

@Injectable()
export class BigdealService {
  constructor(@InjectModel('categorie') private BigdealModel: Model<IBigdeal>) {}
      async createBigdeal(createBigdealDto: CreateBigdealDto): Promise<IBigdeal> {
        const newBigdeal = await new this.BigdealModel(createBigdealDto);
        return newBigdeal.save();
      }
    
      async updateBigdeal(id: string, updateBigdealDto: UpdateBigdealDto): Promise<IBigdeal> {
        const existingBigdeal = await this.BigdealModel.findByIdAndUpdate(id, updateBigdealDto, {new:true})
        if(!existingBigdeal){
          throw new NotFoundException(`Bigdeal #${id} not found`);
        }
        return existingBigdeal;
      }
    
      async getAllBigdeals(): Promise<IBigdeal[]> {
        const BigdealData = await this.BigdealModel.find({type:"bigdeal"}).select("-__v");
        if (!BigdealData || BigdealData.length == 0){
          throw new NotFoundException('Bigdeals data not found!');
        }
        return BigdealData;
      }
    
      async getBigdeal(id: string): Promise<IBigdeal> {
        const existingBigdeal = await this.BigdealModel.findById(id).exec();
        if(!existingBigdeal){
          throw new NotFoundException(`Bigdeal #${id} not found`);
        }
        return existingBigdeal;
        }
    
      async deleteBigdeal(id: string): Promise<IBigdeal> {
        const deletedBigdeal = await this.BigdealModel.findByIdAndDelete(id);
        if(!deletedBigdeal){
          throw new NotFoundException(`Bigdeal #${id} not found`);
        }
        return deletedBigdeal;
        }
    }
      