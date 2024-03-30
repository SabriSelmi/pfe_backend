import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IClient } from './interface/client.interface';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

  
  @Injectable()
  export class ClientService {
    constructor(@InjectModel('users') private ClientModel: Model<IClient>) {}
    async createClient(createClientDto: CreateClientDto): Promise<IClient> {
      const newClient = await new this.ClientModel(createClientDto);
      return newClient.save();
    }
  
    async updateClient(ClientId: string, updateClientDto: UpdateClientDto): Promise<IClient> {
      const existingClient = await this.ClientModel.findByIdAndUpdate(ClientId, updateClientDto, {new:true})
      if(!existingClient){
        throw new NotFoundException(`Client #${ClientId} not found`);
      }
      return existingClient;
    }
  
    async getAllClients(): Promise<IClient[]> {
      const ClientData = await this.ClientModel.find({role:"client"}).select("-__v");
      if (!ClientData || ClientData.length == 0){
        throw new NotFoundException('Clients data not found!');
      }
      return ClientData;
    }
  
    async getClient(ClientId: string): Promise<IClient> {
      const existingClient = await this.ClientModel.findById(ClientId).exec();
      if(!existingClient){
        throw new NotFoundException(`Client #${ClientId} not found`);
      }
      return existingClient;
      }

      async findByUsername(username: string): Promise<IClient> {
        const user = await this.ClientModel.findOne({username});
        return user
      }
  
    async deleteClient(ClientId: string): Promise<IClient> {
      const deletedClient = await this.ClientModel.findByIdAndDelete(ClientId);
      if(!deletedClient){
        throw new NotFoundException(`Client #${ClientId} not found`);
      }
      return deletedClient;
      }
 
  }
    