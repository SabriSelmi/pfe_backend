import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put, UseInterceptors, UploadedFile, BadRequestException} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

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
  async createUser(@Res() response, @Body() createUtilisateurDto: CreateUtilisateurDto, @UploadedFile() file) {
    try{
      createUtilisateurDto.photo=file.filename;
      const newUser = await this.utilisateurService.createUser(createUtilisateurDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        status: HttpStatus.CREATED,
        data: newUser
      });
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: User not created'+ err,
        data: null
    });
    }
  }
  @Put('/:id')
  async updateUser(@Res() response, @Param('id') UserId: string, @Body() updateUtilisateurDto: UpdateUtilisateurDto) {
    try{
      const existingUser = await this.utilisateurService.updateUser(UserId, updateUtilisateurDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data: existingUser,
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
  async getUsers(@Res() response) {
    try{
      const UserData = await this.utilisateurService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found successfully',
        status: HttpStatus.OK,
        data: UserData,
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
  async getUser(@Res() response, @Param('id') UserId: string) {
    try{
      const existingUser = await this.utilisateurService.getUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        data: existingUser,
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
  async deleteUser(@Res() response, @Param('id') UserId: string) {
    try{
      const deleteUser = await this.utilisateurService.deleteUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully deleted',
        data: deleteUser,
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

  @Post('/email')
  async sendResetPasswordEmail(@Res() response, @Body() resetPasswordDto: CreateUtilisateurDto) {
    try {
      await this.utilisateurService.sendResetPasswordEmail(resetPasswordDto.username);
      return response.status(HttpStatus.OK).json({
        message: 'code envoyé avec succès',
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
  @Post('/verification-code')
  async verifyResetCode(@Res() response, @Body() resetPasswordDto: CreateUtilisateurDto) {
    try {
      await this.utilisateurService.verifyResetCode(resetPasswordDto.resetCode);
      return response.status(HttpStatus.OK).json({
        message: 'code correct',
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Post('/reset-password')
  async resetPassword(@Res() response, @Body() resetPasswordDto: CreateUtilisateurDto) {
    try {
      await this.utilisateurService.resetPassword(resetPasswordDto.username, resetPasswordDto.password);

      return response.status(HttpStatus.OK).json({
        message: 'Mot de passe réinitialisé avec succès',
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
}
