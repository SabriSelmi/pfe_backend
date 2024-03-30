import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAdministrateur } from './interface/administrateur.interface';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';

  
  @Injectable()
  export class AdministrateurService {
    constructor(@InjectModel('users') private AdministrateurModel: Model<IAdministrateur>) {}
    async createAdministrateur(createAdministrateurDto: CreateAdministrateurDto): Promise<IAdministrateur> {
      const newAdministrateur = await new this.AdministrateurModel(createAdministrateurDto);
      return newAdministrateur.save();
    }
  
    async updateAdministrateur(AdId: string, updateAdministrateurDto: UpdateAdministrateurDto): Promise<IAdministrateur> {
      const existingAdministrateur = await this.AdministrateurModel.findByIdAndUpdate(AdId, updateAdministrateurDto, {new:true})
      if(!existingAdministrateur){
        throw new NotFoundException(`Administrateur #${AdId} not found`);
      }
      return existingAdministrateur;
    }
  
    async getAllAdministrateurs(): Promise<IAdministrateur[]> {
      const AdministrateurData = await this.AdministrateurModel.find({role:"administrateur"}).select("-__v");
      if (!AdministrateurData || AdministrateurData.length == 0){
        throw new NotFoundException('Administrateurs data not found!');
      }
      return AdministrateurData;
    }
  
    async getAdministrateur(AdId: string): Promise<IAdministrateur> {
      const existingAdministrateur = await this.AdministrateurModel.findById(AdId).exec();
      if(!existingAdministrateur){
        throw new NotFoundException(`Administrateur #${AdId} not found`);
      }
      return existingAdministrateur;
      }
  
    async deleteAdministrateur(AdId: string): Promise<IAdministrateur> {
      const deletedAdministrateur = await this.AdministrateurModel.findByIdAndDelete(AdId);
      if(!deletedAdministrateur){
        throw new NotFoundException(`Administrateur #${AdId} not found`);
      }
      return deletedAdministrateur;
      }
  }
    