import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true})
export class Normal extends Document {
    type: string;

}
export const NormalSchema = SchemaFactory.createForClass(Normal);

