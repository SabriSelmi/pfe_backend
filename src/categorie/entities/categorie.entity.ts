import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true, discriminatorKey:"type"})
export class Categorie extends Document {
    type:string;
    @Prop({required:true, unique:true})
    nom: string;

    @Prop({required:true})
    description: string;

    @Prop([{ type: SchemaTypes.ObjectId, ref:'annonce'}])
    annonces: Types.ObjectId[]

}
export const CategorieSchema = SchemaFactory.createForClass(Categorie);

