import { AnnonceModule } from './../annonce/annonce.module';
import { Favoris } from './entities/favoris.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFavoris } from './interface/favoris.interface';
import { CreateFavorisDto } from './dto/create-favoris.dto';
import { UpdateFavorisDto } from './dto/update-favoris.dto';
import { IClient } from 'src/client/interface/client.interface';
import { IAnnonce } from 'src/annonce/interface/annonce.interface';



@Injectable()
export class FavorisService {
  constructor(@InjectModel('favoris') private FavorisModel: Model<IFavoris>, @InjectModel('users') private ClientModel: Model<IClient>, @InjectModel('annonce') private AnnonceModel: Model<IAnnonce>) {}
      async createFavoris(createFavorisDto: CreateFavorisDto): Promise<IFavoris> {
        const newFavoris = await new this.FavorisModel(createFavorisDto);
        await this.ClientModel.findByIdAndUpdate(createFavorisDto.user, {$push:{favoris:newFavoris}});
        await this.AnnonceModel.findByIdAndUpdate(createFavorisDto.annonce, {$push:{favoris:newFavoris}})
        return newFavoris.save();
      }
    
      async updateFavoris(id: string, updateFavorisDto: UpdateFavorisDto): Promise<IFavoris> {
        const existingFavoris = await this.FavorisModel.findByIdAndUpdate(id, updateFavorisDto, {new:true})
        if(!existingFavoris){
          throw new NotFoundException(`Favoris #${id} not found`);
        }
        return existingFavoris;
      }
    
      async getAllFavorises(): Promise<IFavoris[]> {
        const FavorisData = await this.FavorisModel.find().populate("annonce").populate("user").select("-__v");
        if (!FavorisData || FavorisData.length == 0){
          throw new NotFoundException('Favorises data not found!');
        }
        return FavorisData;
      }
    
      async getFavoris(id: string): Promise<IFavoris> {
        const existingFavoris = await this.FavorisModel.findById(id).exec();
        if(!existingFavoris){
          throw new NotFoundException(`Favoris #${id} not found`);
        }
        return existingFavoris;
        }
    
      async deleteFavoris(id: string): Promise<IFavoris> {
        const deletedFavoris = await this.FavorisModel.findByIdAndDelete(id);
        await this.ClientModel.findByIdAndUpdate(deletedFavoris.user, {$pull:{favoris:deletedFavoris._id}});
        await this.AnnonceModel.findByIdAndUpdate(deletedFavoris.annonce, {$pull:{favoris:deletedFavoris._id}})
        if(!deletedFavoris){
          throw new NotFoundException(`Favoris #${id} not found`);
        }
        return deletedFavoris;
        } 

      async getFavorisByUser(userId: string): Promise<IFavoris[]> {
        const favorisByUser = await this.FavorisModel.find({ user: userId }).populate("annonce").populate("user").select("-__v");
        if (!favorisByUser || favorisByUser.length === 0) {
            throw new NotFoundException(`No favoris found for user with ID ${userId}`);
        }
        return favorisByUser;
    }
    async checkIfFavorited(userId: string, annonceId: string): Promise<boolean> {
      const favoris = await this.FavorisModel.findOne({ user: userId, annonce: annonceId }).exec();
      return !!favoris;
    }
    
      }
      