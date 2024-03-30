import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put, UseInterceptors, UploadedFile} from '@nestjs/common';
import { VendeurService } from './vendeur.service';
import { CreateVendeurDto } from './dto/create-vendeur.dto';
import { UpdateVendeurDto } from './dto/update-vendeur.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('vendeur')
export class VendeurController {
  constructor(private readonly vendeurService: VendeurService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("files",{
      storage: diskStorage({
        destination:"./upload/users",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createVendeur(@Res() response, @Body() createVendeurDto: CreateVendeurDto, @UploadedFile() file) {
    try{
      createVendeurDto.photo=file.filename;
      const newVendeur = await this.vendeurService.createVendeur(createVendeurDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Vendeur has been created successfully',
        status: HttpStatus.CREATED,
        data: newVendeur
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Vendeur not created'+ err,
        data: null
    });
    }
  }
  @Put(':id/confirm')
  async confirmVendeur(@Param('id') id: string) {
    return await this.vendeurService.confirmerVendeur(id);
  }
  @Put('/:id')
  async updateVendeur(@Res() response, @Param('id') VendeurId: string, @Body() updateVendeurDto: UpdateVendeurDto) {
    try{
      const existingVendeur = await this.vendeurService.updateVendeur(VendeurId, updateVendeurDto);
      return response.status(HttpStatus.OK).json({
        message: 'Vendeur has been successfully updated',
        data: existingVendeur,
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
  async getVendeurs(@Res() response) {
    try{
      const VendeurData = await this.vendeurService.getAllVendeurs();
      return response.status(HttpStatus.OK).json({
        message: 'All Vendeurs data found successfully',
        status: HttpStatus.OK,
        data: VendeurData,
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
  async getVendeur(@Res() response, @Param('id') VendeurId: string) {
    try{
      const existingVendeur = await this.vendeurService.getVendeur(VendeurId);
      return response.status(HttpStatus.OK).json({
        message: 'Vendeur found successfully',
        data: existingVendeur,
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
  async deleteVendeur(@Res() response, @Param('id') VendeurId: string) {
    try{
      const deleteVendeur = await this.vendeurService.deleteVendeur(VendeurId);
      return response.status(HttpStatus.OK).json({
        message: 'Vendeur has been successfully deleted',
        data: deleteVendeur,
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
