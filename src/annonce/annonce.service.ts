import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAnnonce } from './interface/annonce.interface';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { ICategorie } from 'src/categorie/interface/categorie.interface';
import { IClient } from 'src/client/interface/client.interface';
import { IVendeur } from 'src/vendeur/interface/vendeur.interface';

@Injectable()
export class AnnonceService {
  constructor(@InjectModel('annonce') private AnnonceModel: Model<IAnnonce>, @InjectModel('categorie') private CategoryModel: Model<ICategorie>, 
  @InjectModel('users') private ClientModel: Model<IClient>, @InjectModel('users') private VendeurModel: Model<IVendeur>) {}
      async createAnnonce(createAnnonceDto: CreateAnnonceDto): Promise<IAnnonce> {
        const newAnnonce = await new this.AnnonceModel(createAnnonceDto);
        await this.CategoryModel.findByIdAndUpdate(createAnnonceDto.category, {$push:{annonces:newAnnonce}})
        await this.ClientModel.findByIdAndUpdate(createAnnonceDto.client, {$push:{annonces:newAnnonce}})
        await this.VendeurModel.findByIdAndUpdate(createAnnonceDto.vendeur, {$push:{annonces:newAnnonce}})
        return newAnnonce.save();
      }
    
      async updateAnnonce(id: string, updateAnnonceDto: UpdateAnnonceDto): Promise<IAnnonce> {
        const existingAnnonce = await this.AnnonceModel.findByIdAndUpdate(id, updateAnnonceDto, {new:true})
        if(!existingAnnonce){
          throw new NotFoundException(`Annonce #${id} not found`);
        }
        return existingAnnonce;
      }
    
      async getAllAnnonces(): Promise<IAnnonce[]> {
        const AnnonceData = await this.AnnonceModel.find().populate("category").populate("client").select("-__v");
        if (!AnnonceData || AnnonceData.length == 0){
          throw new NotFoundException('Annonces data not found!');
        }
        return AnnonceData;
      }
    
      async getAnnonce(id: string): Promise<IAnnonce> {
        const existingAnnonce =  await this.AnnonceModel.findById(id);
        if(!existingAnnonce){
          throw new NotFoundException(`Annonce #${id} not found`);
        }
        return existingAnnonce;
        }
    
      async deleteAnnonce(id: string): Promise<IAnnonce> {
        const deletedAnnonce = await this.AnnonceModel.findByIdAndDelete(id);
        await this.CategoryModel.findByIdAndUpdate(deletedAnnonce.category, {$pull:{annonces:deletedAnnonce._id}})
        await this.ClientModel.findByIdAndUpdate(deletedAnnonce.client, {$pull:{annonces:deletedAnnonce._id}})
        await this.VendeurModel.findByIdAndUpdate(deletedAnnonce.vendeur, {$pull:{annonces:deletedAnnonce._id}})
        if(!deletedAnnonce){
          throw new NotFoundException(`Annonce #${id} not found`);
        }
        return deletedAnnonce;
        }

        async confirmerAnnonce(id: string): Promise<IAnnonce> {
          const annonce = await this.AnnonceModel.findById(id);
            if (!annonce) {
              throw new NotFoundException(`Annonce avec l'ID ${id} n'a pas été trouvée.`);
          }
            annonce.confirmed = true;
          const annonceConfirme = await annonce.save();
            return annonceConfirme;
      }

      async checkFavoris(id: string): Promise<IAnnonce> {
        const annonce = await this.AnnonceModel.findById(id);
          if (!annonce) {
            throw new NotFoundException(`Annonce avec l'ID ${id} n'a pas été trouvée.`);
        }
          annonce.isFavorited = true;
        const checkAnnonce = await annonce.save();
          return checkAnnonce;
    }
    async getRecentAnnonces(limit: number): Promise<IAnnonce[]> {
      return await this.AnnonceModel.find().sort({ createdAt: -1 }).limit(limit).populate("category").populate("client").select("-__v");
    }
  }
        
    
      