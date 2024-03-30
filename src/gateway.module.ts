import { Module, forwardRef } from '@nestjs/common';
import { UtilisateurModule } from './utilisateur/utilisateur.module'; 
import { MyWebSocketGateway } from './mywebsocket.gateway';

@Module({
  imports: [forwardRef(() => UtilisateurModule)], 
  providers: [MyWebSocketGateway],
  exports: [MyWebSocketGateway]
})
export class MyWebSocketGatewayModule {}
