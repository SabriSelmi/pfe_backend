import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put} from '@nestjs/common';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { CommentaireService } from './commentaire.service';




@Controller('commentaire')
export class CommentaireController {
  constructor(private readonly commentaireService: CommentaireService) {}

  @Post()
  async createCommentaire(@Res() response, @Body() createCommentaireDto: CreateCommentaireDto) {
    try{
      const newCommentaire = await this.commentaireService.createCommentaire(createCommentaireDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Commentaire has been created successfully',
        status: HttpStatus.CREATED,
        data: newCommentaire
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Commentaire not created'+ err,
        data: null
    });
    }
  }
  @Put(':id/confirm')
  async confirmCommentaire(@Param('id') id: string) {
    return await this.commentaireService.confirmerCommentaire(id);
  }
  @Put('/:id')
  async updateCommentaire(@Res() response, @Param('id') idC: string, @Body() updateCommentaireDto: UpdateCommentaireDto) {
    try{
      const existingCommentaire = await this.commentaireService.updateCommentaire(idC, updateCommentaireDto);
      return response.status(HttpStatus.OK).json({
        message: 'Commentaire has been successfully updated',
        data: existingCommentaire,
        status: HttpStatus.OK
      })
    } catch (err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Get()
  async getCommentaires(@Res() response) {
    try{
      const CommentaireData = await this.commentaireService.getAllCommentaires();
      return response.status(HttpStatus.OK).json({
        message: 'All Commentaires data found successfully',
        status: HttpStatus.OK,
        data: CommentaireData,
      });
    } catch(err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
    });
    }
  }

  @Get('/:id')
  async getCommentaire(@Res() response, @Param('id') idC: string) {
    try{
      const existingCommentaire = await this.commentaireService.getCommentaire(idC);
      return response.status(HttpStatus.OK).json({
        message: 'Commentaire found successfully',
        data: existingCommentaire,
        status: HttpStatus.OK
      });
    } catch(err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
    });
    }
  }

  @Delete('/:id')
  async deleteCommentaire(@Res() response, @Param('id') idC: string) {
    try{
      const deleteCommentaire = await this.commentaireService.deleteCommentaire(idC);
      return response.status(HttpStatus.OK).json({
        message: 'Commentaire has been successfully deleted',
        data: deleteCommentaire,
        status: HttpStatus.OK
      })
    } catch (err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
 
}
