import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put, UseInterceptors, UploadedFile} from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('annonce')
export class AnnonceController {
  constructor(private readonly annonceService: AnnonceService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("files",{
      storage: diskStorage({
        destination:"./upload/annonces",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createAnnonce(@Res() response, @Body() createAnnonceDto: CreateAnnonceDto, @UploadedFile() file) {
    try{
      createAnnonceDto.photo=file.filename;
      const newAnnonce = await this.annonceService.createAnnonce(createAnnonceDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Annonce has been created successfully',
        status: HttpStatus.CREATED,
        data: newAnnonce
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Annonce not created'+ err,
        data: null
    });
    }
  }

  @Put(':id/confirm')
  async confirmAnnonce(@Param('id') id: string) {
    return await this.annonceService.confirmerAnnonce(id);
  }

  @Put(':id/check')
  async checkFavoris(@Param('id') id: string) {
    return await this.annonceService.checkFavoris(id);
  }

  @Put('/:id')
  async updateAnnonce(@Res() response, @Param('id') idA: string, @Body() updateAnnonceDto: UpdateAnnonceDto) {
    try{
      const existingAnnonce = await this.annonceService.updateAnnonce(idA, updateAnnonceDto);
      return response.status(HttpStatus.OK).json({
        message: 'Annonce has been successfully updated',
        data: existingAnnonce,
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
  async getAnnonces(@Res() response) {
    try{
      const AnnonceData = await this.annonceService.getAllAnnonces();
      return response.status(HttpStatus.OK).json({
        message: 'All Annonces data found successfully',
        status: HttpStatus.OK,
        data: AnnonceData,
      });
    } catch(err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
    });
    }
  }
@Get('/recent/:limit')
async getRecentAnnonces(@Res() response, @Param('limit') limit: number) {
  try {
    const recentAnnonces = await this.annonceService.getRecentAnnonces(limit);
    return response.status(HttpStatus.OK).json({
      message: `Successfully fetched ${limit} recent annonces`,
      data: recentAnnonces,
      status: HttpStatus.OK
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: err.message,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }
}

  @Get('/:id')
  async getAnnonce(@Res() response, @Param('id') idA: string) {
    try{
      const existingAnnonce = await this.annonceService.getAnnonce(idA);
      return response.status(HttpStatus.OK).json({
        message: 'Annonce found successfully',
        data: existingAnnonce,
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
  async deleteAnnonce(@Res() response, @Param('id') idA: string) {
    try{
      const deleteAnnonce = await this.annonceService.deleteAnnonce(idA);
      return response.status(HttpStatus.OK).json({
        message: 'Annonce has been successfully deleted',
        data: deleteAnnonce,
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
