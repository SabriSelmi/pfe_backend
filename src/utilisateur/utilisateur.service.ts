import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUtilisateur } from './interface/utilisateur.interface';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import * as argon2 from 'argon2';
import * as nodemailer from 'nodemailer';

  
  @Injectable()
  export class UtilisateurService {
    transporter: any;

    constructor(@InjectModel('users') private UserModel: Model<IUtilisateur>) {
      this.transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
          user: 'chaima.selmi2000@gmail.com',
          pass: 'psev vrln chuw nuho'
        },
      });
    }
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

    async getEmailByUsername(username: string): Promise<string | null> {
      const user = await this.UserModel.findOne({ username });
      return user ? user.email : null;
    }
    
  
    async deleteUser(UserId: string): Promise<IUtilisateur> {
      const deletedUser = await this.UserModel.findByIdAndDelete(UserId);
      if(!deletedUser){
        throw new NotFoundException(`User #${UserId} not found`);
      }
      return deletedUser;
      }
      async hashData(data:string): Promise<string> {
        return argon2.hash(data);
      }


      async sendResetPasswordEmail(username: string): Promise<void> {
        const user = await this.UserModel.findOne({ username });
        if (!user) {
          throw new NotFoundException(`User with email ${username} not found`);
        }
          const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();
          user.resetCode = resetCode;
        await user.save();
        await this.transporter.sendMail({
          from: 'chaima.selmi2000@gmail.com',
          to: user.email,
          subject: 'Réinitialisation du mot de passe',
          text: `Votre code de réinitialisation de mot de passe est : ${resetCode}`,
        });
      }
    
      async verifyResetCode(resetCode: string): Promise<boolean> {
        const user = await this.UserModel.findOne({ resetCode });
        if (!user) {
          return false;
        }
        return true;
      }
    
      async resetPassword(username: string, newPassword: string): Promise<void> {
        const hashedPassword = await argon2.hash(newPassword);
        await this.UserModel.findOneAndUpdate({ username }, { password: hashedPassword, resetCode: '' });
      }

  }
    