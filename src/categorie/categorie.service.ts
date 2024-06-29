import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategorie } from './interface/categorie.interface';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategorieService {
  constructor(@InjectModel('categorie') private CategorieModel: Model<ICategorie>) {}
      async createCategorie(createCategorieDto: CreateCategorieDto): Promise<ICategorie> {
        const newCategorie = await new this.CategorieModel(createCategorieDto);
        return newCategorie.save();
      }
    
      async updateCategorie(id: string, updateCategorieDto: UpdateCategorieDto): Promise<ICategorie> {
        const existingCategorie = await this.CategorieModel.findByIdAndUpdate(id, updateCategorieDto, {new:true})
        if(!existingCategorie){
          throw new NotFoundException(`Categorie #${id} not found`);
        }
        return existingCategorie;
      }
    
      async getAllCategories(): Promise<ICategorie[]> {
        const CategorieData = await this.CategorieModel.find().populate("annonces").select("-__v");
        if (!CategorieData || CategorieData.length == 0){
          throw new NotFoundException('Categories data not found!');
        }
        return CategorieData;
      }
    
      async getCategorie(id: string): Promise<ICategorie> {
        const existingCategorie = await this.CategorieModel.findById(id).exec();
        if(!existingCategorie){
          throw new NotFoundException(`Categorie #${id} not found`);
        }
        return existingCategorie;
        }
    
      async deleteCategorie(id: string): Promise<ICategorie> {
        const deletedCategorie = await this.CategorieModel.findByIdAndDelete(id);
        if(!deletedCategorie){
          throw new NotFoundException(`Categorie #${id} not found`);
        }
        return deletedCategorie;
        }

        
    }
      