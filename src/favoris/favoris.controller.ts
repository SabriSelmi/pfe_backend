import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put, NotFoundException} from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { CreateFavorisDto } from './dto/create-favoris.dto';
import { UpdateFavorisDto } from './dto/update-favoris.dto';


@Controller('favoris')
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  @Post()
  async createFavoris(@Res() response, @Body() createFavorisDto: CreateFavorisDto) {
    try{
      const newFavoris = await this.favorisService.createFavoris(createFavorisDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Favoris has been created successfully',
        status: HttpStatus.CREATED,
        data: newFavoris
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Favoris not created'+ err,
        data: null
    });
    }
  }

  @Put('/:id')
  async updateFavoris(@Res() response, @Param('id') idF: string, @Body() updateFavorisDto: UpdateFavorisDto) {
    try{
      const existingFavoris = await this.favorisService.updateFavoris(idF, updateFavorisDto);
      return response.status(HttpStatus.OK).json({
        message: 'Favoris has been successfully updated',
        data: existingFavoris,
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
  @Get('user/:id')
  async getFavorisByUser(@Param('id') id: string) {
    return await this.favorisService.getFavorisByUser(id);
  }

  @Get()
  async getFavorises(@Res() response) {
    try{
      const FavorisData = await this.favorisService.getAllFavorises();
      return response.status(HttpStatus.OK).json({
        message: 'All Favorises data found successfully',
        status: HttpStatus.OK,
        data: FavorisData,
      });
    } catch(err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
    });
    }
  }
  @Get(':userId/:annonceId')
  async checkIfFavorited(@Param('userId') userId: string, @Param('annonceId') annonceId: string): Promise<boolean> {
    const isFavorited = await this.favorisService.checkIfFavorited(userId, annonceId);
    if (!isFavorited) {
      throw new NotFoundException(`Annonce with ID ${annonceId} is not favorited by user with ID ${userId}.`);
    }
    return isFavorited;
  }

  @Get('/:id')
  async getFavoris(@Res() response, @Param('id') idF: string) {
    try{
      const existingFavoris = await this.favorisService.getFavoris(idF);
      return response.status(HttpStatus.OK).json({
        message: 'Favoris found successfully',
        data: existingFavoris,
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
  async deleteFavoris(@Res() response, @Param('id') idF: string) {
    try{
      const deleteFavoris = await this.favorisService.deleteFavoris(idF);
      return response.status(HttpStatus.OK).json({
        message: 'Favoris has been successfully deleted',
        data: deleteFavoris,
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
