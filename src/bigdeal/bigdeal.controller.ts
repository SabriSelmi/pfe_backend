import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put} from '@nestjs/common';
import { UpdateBigdealDto } from './dto/update-bigdeal.dto';
import { CreateBigdealDto } from './dto/create-bigdeal.dto';
import { BigdealService } from './bigdeal.service';


@Controller('bigdeal')
export class BigdealController {
  constructor(private readonly bigdealService: BigdealService) {}

  @Post()
  async createBigdeal(@Res() response, @Body() createBigdealDto: CreateBigdealDto) {
    try{
      const newBigdeal = await this.bigdealService.createBigdeal(createBigdealDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Bigdeal has been created successfully',
        status: HttpStatus.CREATED,
        data: newBigdeal
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Bigdeal not created'+ err,
        data: null
    });
    }
  }
  @Put('/:id')
  async updateBigdeal(@Res() response, @Param('id') idB: string, @Body() updateBigdealDto: UpdateBigdealDto) {
    try{
      const existingBigdeal = await this.bigdealService.updateBigdeal(idB, updateBigdealDto);
      return response.status(HttpStatus.OK).json({
        message: 'Bigdeal has been successfully updated',
        data: existingBigdeal,
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
  async getBigdeals(@Res() response) {
    try{
      const BigdealData = await this.bigdealService.getAllBigdeals();
      return response.status(HttpStatus.OK).json({
        message: 'All Bigdeals data found successfully',
        status: HttpStatus.OK,
        data: BigdealData,
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
  async getBigdeal(@Res() response, @Param('id') idB: string) {
    try{
      const existingBigdeal = await this.bigdealService.getBigdeal(idB);
      return response.status(HttpStatus.OK).json({
        message: 'Bigdeal found successfully',
        data: existingBigdeal,
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
  async deleteBigdeal(@Res() response, @Param('id') idB: string) {
    try{
      const deleteBigdeal = await this.bigdealService.deleteBigdeal(idB);
      return response.status(HttpStatus.OK).json({
        message: 'Bigdeal has been successfully deleted',
        data: deleteBigdeal,
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
