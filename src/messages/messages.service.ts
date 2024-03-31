import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from './interface/message.interface';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MessagesService {

  constructor(@InjectModel('message') private MessageModel: Model<IMessage>){}
  create(createMessageDto: CreateMessageDto) {
    return this.MessageModel.create(createMessageDto);
  }

  findAll(id : string) {
    return this.MessageModel.find({ $or: [{ reciever: id }, { sender: id }] }).populate({ path: "sender", select: ["username", "_id"] }).populate({ path: "reciever", select: ["username", "_id", "role"] }).exec();
  }

  findConversation(sender : string, reciever : string) {
    return this.MessageModel.find({ $or : [{$and: [{ reciever }, { sender }]},{$and: [{ reciever : sender }, { sender : reciever }]}] })
      .populate({ path: "sender", select: ["username", "_id"] })
      .populate({ path: "reciever", select: ["username", "_id", "role"] })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
