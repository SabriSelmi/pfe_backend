import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUtilisateur } from './interface/utilisateur.interface';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
  
  @Injectable()
  export class UtilisateurService {
    constructor(@InjectModel('users') private UserModel: Model<IUtilisateur>) {}
    async createUser(createUtilisateurDto: CreateUtilisateurDto): Promise<IUtilisateur> {
      const newUser = await new this.UserModel(createUtilisateurDto);
      return newUser.save();
    }
  
    async updateUser(UserId: string, updateUtilisateurDto: UpdateUtilisateurDto): Promise<IUtilisateur> {
      const existingUser = await this.UserModel.findByIdAndUpdate(UserId, updateUtilisateurDto, {new:true})
      if(!existingUser){
        throw new NotFoundException(`User #${UserId} not found`);
      }
      return existingUser;
    }
    async updateUserSocket(UserId: string, socketId:string){
      await this.UserModel.updateOne({_id: UserId}, {socketId} )
    }   

    async getSocketIdByUserId(userId: string): Promise<string | null> {
      try {
        const user = await this.UserModel.findById(userId);
        return user ? user.socketId : null;
      } catch (error) {
        console.error("Erreur lors de la recherche de l'ID de l'utilisateur:", error);
        return null;
      }
    }

    async getAllUsers(): Promise<IUtilisateur[]> {
      const UserData = await this.UserModel.find().select("-__v");
      if (!UserData || UserData.length == 0){
        throw new NotFoundException('Users data not found!');
      }
      return UserData;
    }
  
    async getUser(UserId: string): Promise<IUtilisateur> {
      const existingUser = await this.UserModel.findById(UserId).exec();
      if(!existingUser){
        throw new NotFoundException(`User #${UserId} not found`);
      }
      return existingUser;
      }
  
    async findByUsername(username: string): Promise<IUtilisateur> {
      const user = await this.UserModel.findOne({username});
      return user
    }
  
    async deleteUser(UserId: string): Promise<IUtilisateur> {
      const deletedUser = await this.UserModel.findByIdAndDelete(UserId);
      if(!deletedUser){
        throw new NotFoundException(`User #${UserId} not found`);
      }
      return deletedUser;
      }
  }
    