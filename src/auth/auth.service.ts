import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUtilisateurDto } from 'src/utilisateur/dto/create-utilisateur.dto';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { CreateLoginDto } from './dto/create-login.dto';
import * as argon2 from 'argon2';
import { ClientService } from 'src/client/client.service';
import { VendeurService } from 'src/vendeur/vendeur.service';
import { CreateVendeurDto } from 'src/vendeur/dto/create-vendeur.dto';
import { CreateClientDto } from 'src/client/dto/create-client.dto';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UtilisateurService,
    private vendeurService: VendeurService,
    private clientService: ClientService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }
  async signUpVendeur (createVendeurDto: CreateVendeurDto): Promise<any> {
    const userExists = await this.vendeurService.findByUsername(
      createVendeurDto.username,
    );
    if (userExists){
      throw new BadRequestException('Vendeur already exists');
    }
    const newUser = await this.vendeurService.createVendeur(createVendeurDto);
    const tokens = await this.getTokens(newUser._id, newUser.username);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return {tokens, newUser}
  }
  async signUpClient (createClientDto: CreateClientDto): Promise<any> {
    const userExists = await this.clientService.findByUsername(
      createClientDto.username,
    );
    if (userExists){
      throw new BadRequestException('Client already exists');
    }
    const newUser = await this.clientService.createClient(createClientDto);
    const tokens = await this.getTokens(newUser._id, newUser.username);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return {tokens, newUser}
  }
  
  async signIn(data: CreateLoginDto) {
    //check if user exists
    const user = await this.usersService.findByUsername(data.username);
    if(!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
     throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user._id, user.username);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return {tokens, user}
  }
  
  async getTokens(userId: string, username: string){
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '5m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  hashData(data:string){
    return argon2.hash(data);
  }
  async updateRefreshToken(userId: string, refreshToken: string){
    //fonction pour hasher le refreshtoken
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  
  async logout(userId: string){
    this.usersService.updateUser(userId, {refreshToken: null});
  }
  
  async refreshTokens(userId: string, refreshToken: string){
    // pour update les tokens
    const user = await this.usersService.getUser(userId);
    if (!user || !user.refreshToken)
     throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  }
