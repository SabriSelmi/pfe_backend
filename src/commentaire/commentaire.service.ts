import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICommentaire } from './interface/commentaire.interface';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { IClient } from 'src/client/interface/client.interface';
import { IAnnonce } from 'src/annonce/interface/annonce.interface';


@Injectable()
export class CommentaireService {
  constructor(@InjectModel('commentaire') private CommentaireModel: Model<ICommentaire>, @InjectModel('users') private ClientModel: Model<IClient>,
  @InjectModel('annonce') private AnnonceModel: Model<IAnnonce>) {}
      async createCommentaire(createCommentaireDto: CreateCommentaireDto): Promise<ICommentaire> {
        const newCommentaire = await new this.CommentaireModel(createCommentaireDto );
        await this.ClientModel.findByIdAndUpdate(createCommentaireDto.auteur, {$push:{commentaires:newCommentaire}})
        await this.AnnonceModel.findByIdAndUpdate(createCommentaireDto.annonce, {$push:{commentaires:newCommentaire}})
        return newCommentaire.save();
      }
    
      async updateCommentaire(id: string, updateCommentaireDto: UpdateCommentaireDto): Promise<ICommentaire> {
        const existingCommentaire = await this.CommentaireModel.findByIdAndUpdate(id, updateCommentaireDto, {new:true})
        if(!existingCommentaire){
          throw new NotFoundException(`Commentaire #${id} not found`);
        }
        return existingCommentaire;
      }
    
      async getAllCommentaires(): Promise<ICommentaire[]> {
        const CommentaireData = await this.CommentaireModel.find().populate("auteur").populate("annonce").select("-__v");
        if (!CommentaireData || CommentaireData.length == 0){
          throw new NotFoundException('Commentaires data not found!');
        }
        return CommentaireData;
      }
    
      async getCommentaire(id: string): Promise<ICommentaire> {
        const existingCommentaire = await this.CommentaireModel.findById(id).exec();
        if(!existingCommentaire){
          throw new NotFoundException(`Commentaire #${id} not found`);
        }
        return existingCommentaire;
        }
    
      async deleteCommentaire(id: string): Promise<ICommentaire> {
        const deletedCommentaire = await this.CommentaireModel.findByIdAndDelete(id);
        await this.ClientModel.findByIdAndUpdate(deletedCommentaire.auteur, {$pull:{commentaires:deletedCommentaire._id}})
        await this.AnnonceModel.findByIdAndUpdate(deletedCommentaire.annonce, {$pull:{commentaires:deletedCommentaire._id}})
        if(!deletedCommentaire){
          throw new NotFoundException(`Commentaire #${id} not found`);
        }
        return deletedCommentaire;
        } 
        async confirmerCommentaire(id: string): Promise<ICommentaire> {
          const commentaire = await this.CommentaireModel.findById(id);
            if (!commentaire) {
              throw new NotFoundException(`Commentaire avec l'ID ${id} n'a pas été trouvée.`);
          }
          commentaire.confirmed = true;
          const commentaireConfirme = await commentaire.save();
            return commentaireConfirme;
      }
      }
      