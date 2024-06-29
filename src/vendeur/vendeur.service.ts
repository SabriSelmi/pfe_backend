import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVendeur } from './interface/vendeur.interface';
import { CreateVendeurDto } from './dto/create-vendeur.dto';
import { UpdateVendeurDto } from './dto/update-vendeur.dto';

  
  @Injectable()
  export class VendeurService {
    constructor(@InjectModel('users') private VendeurModel: Model<IVendeur>) {}
    async createVendeur(createVendeurDto: CreateVendeurDto): Promise<IVendeur> {
      const newVendeur = await new this.VendeurModel(createVendeurDto);
      return newVendeur.save();
    }
  
    async updateVendeur(VendeurId: string, updateVendeurDto: UpdateVendeurDto): Promise<IVendeur> {
      const existingVendeur = await this.VendeurModel.findByIdAndUpdate(VendeurId, updateVendeurDto, {new:true})
      if(!existingVendeur){
        throw new NotFoundException(`Vendeur #${VendeurId} not found`);
      }
      return existingVendeur;
    }
  
    async getAllVendeurs(): Promise<IVendeur[]> {
      const VendeurData = await this.VendeurModel.find({role:"vendeur"}).populate("annoncesPub").select("-__v");
      if (!VendeurData || VendeurData.length == 0){
        throw new NotFoundException('Vendeurs data not found!');
      }
      return VendeurData;
    }
  
    async getVendeur(VendeurId: string): Promise<IVendeur> {
      const existingVendeur = await this.VendeurModel.findById(VendeurId).exec();
      if(!existingVendeur){
        throw new NotFoundException(`Vendeur #${VendeurId} not found`);
      }
      return existingVendeur;
      }
      async findByUsername(username: string): Promise<IVendeur> {
        const user = await this.VendeurModel.findOne({username});
        return user
      }
  
    async deleteVendeur(VendeurId: string): Promise<IVendeur> {
      const deletedVendeur = await this.VendeurModel.findByIdAndDelete(VendeurId);
      if(!deletedVendeur){
        throw new NotFoundException(`Vendeur #${VendeurId} not found`);
      }
      return deletedVendeur;
      }
      async confirmerVendeur(id: string): Promise<IVendeur> {
        const vendeur = await this.VendeurModel.findById(id);
          if (!vendeur) {
            throw new NotFoundException(`Vendeur avec l'ID ${id} n'a pas été trouvée.`);
        }
          vendeur.confirmed = true;
        const vendeurConfirme = await vendeur.save();
          return vendeurConfirme;
    }
  }
    