import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { AccessTokenStrategy } from './strategie/accesstoken.strategie';
import { RefreshTokenStrategy } from './strategie/refreshtoken.strategie';
import { VendeurModule } from 'src/vendeur/vendeur.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [JwtModule.register({}),UtilisateurModule, VendeurModule, ClientModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
