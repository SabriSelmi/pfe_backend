import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true})
export class Favoris extends Document {

    @Prop({ type: SchemaTypes.ObjectId, ref:'annonce', required:true})
    annonce!: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref:'users', required:true})
    user!: Types.ObjectId;


}
export const FavorisSchema = SchemaFactory.createForClass(Favoris);

