import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put} from '@nestjs/common';
import { UpdateNormalDto } from './dto/update-normal.dto';
import { CreateNormalDto } from './dto/create-normal.dto';
import { NormalService } from './normal.service';

@Controller('normal')
export class NormalController {
  constructor(private readonly normalService: NormalService) {}

  @Post()
  async createNormal(@Res() response, @Body() createNormalDto: CreateNormalDto) {
    try{
      const newNormal = await this.normalService.createNormal(createNormalDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Normal has been created successfully',
        status: HttpStatus.CREATED,
        data: newNormal
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Normal not created'+ err,
        data: null
    });
    }
  }
  @Put('/:id')
  async updateNormal(@Res() response, @Param('id') idN: string, @Body() updateNormalDto: UpdateNormalDto) {
    try{
      const existingNormal = await this.normalService.updateNormal(idN, updateNormalDto);
      return response.status(HttpStatus.OK).json({
        message: 'Normal has been successfully updated',
        data: existingNormal,
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
  async getNormals(@Res() response) {
    try{
      const NormalData = await this.normalService.getAllNormals();
      return response.status(HttpStatus.OK).json({
        message: 'All Normals data found successfully',
        status: HttpStatus.OK,
        data: NormalData,
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
  async getNormal(@Res() response, @Param('id') idN: string) {
    try{
      const existingNormal = await this.normalService.getNormal(idN);
      return response.status(HttpStatus.OK).json({
        message: 'Normal found successfully',
        data: existingNormal,
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
  async deleteNormal(@Res() response, @Param('id') idN: string) {
    try{
      const deleteNormal = await this.normalService.deleteNormal(idN);
      return response.status(HttpStatus.OK).json({
        message: 'Normal has been successfully deleted',
        data: deleteNormal,
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
