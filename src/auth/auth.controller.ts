import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { AccessTokenGuard } from './guards/accesstoken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from './guards/refreshtoken.guard';
import { CreateUtilisateurDto } from 'src/utilisateur/dto/create-utilisateur.dto';
import { AuthService } from './auth.service';
import { CreateVendeurDto } from 'src/vendeur/dto/create-vendeur.dto';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup_v')
  @UseInterceptors(
    FileInterceptor("files",{
      storage: diskStorage({
        destination:"./upload/users",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  signupVendeur(@Body() createVendeurDto: CreateVendeurDto, @UploadedFile() file) {
    createVendeurDto.photo=file.filename;
    return this.authService.signUpVendeur(createVendeurDto);
  }
  @Post('signup_c')
  @UseInterceptors(
    FileInterceptor("files",{
      storage: diskStorage({
        destination:"./upload/users",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  signupClient(@Body() createClientDto: CreateClientDto, @UploadedFile() file) {
    createClientDto.photo=file.filename;
    return this.authService.signUpClient(createClientDto);
  }

  @Post('signin')
  signin(@Body() data: CreateLoginDto) {
    return this.authService.signIn(data);
  }
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
