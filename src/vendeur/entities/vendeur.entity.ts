import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true})
export class Vendeur extends Document {
    role: string;
    @Prop({required:true})
    domaine: string;
    @Prop([{ type: SchemaTypes.ObjectId, ref:'annonce'}])
    annoncesPub: Types.ObjectId[]
    @Prop({ default: false }) 
    confirmed: boolean;

}
export const VendeurSchema = SchemaFactory.createForClass(Vendeur);



