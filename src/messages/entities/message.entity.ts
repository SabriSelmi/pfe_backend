import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class Message extends Document {

    @Prop({ required: true })
    message: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: 'users', required: true })
    sender: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, ref: 'users', required: true })
    reciever: Types.ObjectId;

}
export const MesssageSchema = SchemaFactory.createForClass(Message);

