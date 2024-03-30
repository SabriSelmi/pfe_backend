import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true})
export class Administrateur extends Document {
    role: string;
    @Prop({required:true})
    privileges: string;

}
export const AdministrateurSchema = SchemaFactory.createForClass(Administrateur);



