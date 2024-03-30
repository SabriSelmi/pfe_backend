import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INormal } from './interface/normal.interface';
import { CreateNormalDto } from './dto/create-normal.dto';
import { UpdateNormalDto } from './dto/update-normal.dto';


  
  @Injectable()
  export class NormalService {
    constructor(@InjectModel('categorie') private NormalModel: Model<INormal>) {}
    async createNormal(createNormalDto: CreateNormalDto): Promise<INormal> {
      const newNormal = await new this.NormalModel(createNormalDto);
      return newNormal.save();
    }
  
    async updateNormal(id: string, updateNormalDto: UpdateNormalDto): Promise<INormal> {
      const existingNormal = await this.NormalModel.findByIdAndUpdate(id, updateNormalDto, {new:true})
      if(!existingNormal){
        throw new NotFoundException(`Normal #${id} not found`);
      }
      return existingNormal;
    }
  
    async getAllNormals(): Promise<INormal[]> {
      const NormalData = await this.NormalModel.find({type:"normal"}).select("-__v");
      if (!NormalData || NormalData.length == 0){
        throw new NotFoundException('Normals data not found!');
      }
      return NormalData;
    }
  
    async getNormal(id: string): Promise<INormal> {
      const existingNormal = await this.NormalModel.findById(id).exec();
      if(!existingNormal){
        throw new NotFoundException(`Normal #${id} not found`);
      }
      return existingNormal;
      }
  
    async deleteNormal(id: string): Promise<INormal> {
      const deletedNormal = await this.NormalModel.findByIdAndDelete(id);
      if(!deletedNormal){
        throw new NotFoundException(`Normal #${id} not found`);
      }
      return deletedNormal;
      }
  }
    