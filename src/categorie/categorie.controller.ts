import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put} from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';



@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  async createCategorie(@Res() response, @Body() createCategorieDto: CreateCategorieDto) {
    try{
      const newCategorie = await this.categorieService.createCategorie(createCategorieDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Categorie has been created successfully',
        status: HttpStatus.CREATED,
        data: newCategorie
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Categorie not created'+ err,
        data: null
    });
    }
  }
  @Put('/:id')
  async updateCategorie(@Res() response, @Param('id') idC: string, @Body() updateCategorieDto: UpdateCategorieDto) {
    try{
      const existingCategorie = await this.categorieService.updateCategorie(idC, updateCategorieDto);
      return response.status(HttpStatus.OK).json({
        message: 'Categorie has been successfully updated',
        data: existingCategorie,
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
  async getCategories(@Res() response) {
    try{
      const CategorieData = await this.categorieService.getAllCategories();
      return response.status(HttpStatus.OK).json({
        message: 'All Categories data found successfully',
        status: HttpStatus.OK,
        data: CategorieData,
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
  async getCategorie(@Res() response, @Param('id') idC: string) {
    try{
      const existingCategorie = await this.categorieService.getCategorie(idC);
      return response.status(HttpStatus.OK).json({
        message: 'Categorie found successfully',
        data: existingCategorie,
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
  async deleteCategorie(@Res() response, @Param('id') idC: string) {
    try{
      const deleteCategorie = await this.categorieService.deleteCategorie(idC);
      return response.status(HttpStatus.OK).json({
        message: 'Categorie has been successfully deleted',
        data: deleteCategorie,
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
