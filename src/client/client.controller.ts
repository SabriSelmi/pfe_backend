import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

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
  async createClient(@Res() response, @Body() createClientDto: CreateClientDto, @UploadedFile() file) {
    try{
      createClientDto.photo=file.filename;
      const newClient = await this.clientService.createClient(createClientDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Client has been created successfully',
        status: HttpStatus.CREATED,
        data: newClient
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Client not created'+ err,
        data: null
    });
    }
  }
  @Put('/:id')
  async updateClient(@Res() response, @Param('id') ClientId: string, @Body() updateClientDto: UpdateClientDto) {
    try{
      const existingClient = await this.clientService.updateClient(ClientId, updateClientDto);
      return response.status(HttpStatus.OK).json({
        message: 'Client has been successfully updated',
        data: existingClient,
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
  async getClients(@Res() response) {
    try{
      const ClientData = await this.clientService.getAllClients();
      return response.status(HttpStatus.OK).json({
        message: 'All Clients data found successfully',
        status: HttpStatus.OK,
        data: ClientData,
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
  async getClient(@Res() response, @Param('id') ClientId: string) {
    try{
      const existingClient = await this.clientService.getClient(ClientId);
      return response.status(HttpStatus.OK).json({
        message: 'Client found successfully',
        data: existingClient,
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
  async deleteClient(@Res() response, @Param('id') ClientId: string) {
    try{
      const deleteClient = await this.clientService.deleteClient(ClientId);
      return response.status(HttpStatus.OK).json({
        message: 'Client has been successfully deleted',
        data: deleteClient,
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
