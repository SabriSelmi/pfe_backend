import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true})
export class Bigdeal extends Document {
    type: string;

}
export const BigdealSchema = SchemaFactory.createForClass(Bigdeal);

