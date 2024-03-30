import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put} from '@nestjs/common';
import { AdministrateurService } from './administrateur.service';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';


@Controller('administrateur')
export class AdministrateurController {
  constructor(private readonly AdministrateurService: AdministrateurService) {}

  @Post()
  async createAdministrateur(@Res() response, @Body() createAdministrateurDto: CreateAdministrateurDto) {
    try{
      const newAdministrateur = await this.AdministrateurService.createAdministrateur(createAdministrateurDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Administrateur has been created successfully',
        status: HttpStatus.CREATED,
        data: newAdministrateur
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Administrateur not created'+ err,
        data: null
    });
    }
  }
  @Put('/:id')
  async updateAdministrateur(@Res() response, @Param('id') AdId: string, @Body() updateAdministrateurDto: UpdateAdministrateurDto) {
    try{
      const existingAdministrateur = await this.AdministrateurService.updateAdministrateur(AdId, updateAdministrateurDto);
      return response.status(HttpStatus.OK).json({
        message: 'Administrateur has been successfully updated',
        data: existingAdministrateur,
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
  async getAdministrateurs(@Res() response) {
    try{
      const AdministrateurData = await this.AdministrateurService.getAllAdministrateurs();
      return response.status(HttpStatus.OK).json({
        message: 'All Administrateurs data found successfully',
        status: HttpStatus.OK,
        data: AdministrateurData,
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
  async getAdministrateur(@Res() response, @Param('id') AdId: string) {
    try{
      const existingAdministrateur = await this.AdministrateurService.getAdministrateur(AdId);
      return response.status(HttpStatus.OK).json({
        message: 'Administrateur found successfully',
        data: existingAdministrateur,
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
  async deleteAdministrateur(@Res() response, @Param('id') AdId: string) {
    try{
      const deleteAdministrateur = await this.AdministrateurService.deleteAdministrateur(AdId);
      return response.status(HttpStatus.OK).json({
        message: 'Administrateur has been successfully deleted',
        data: deleteAdministrateur,
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
