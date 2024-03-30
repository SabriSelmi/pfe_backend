import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true})
export class Annonce extends Document {

    @Prop({required:true, unique:true})
    titre: string;

    @Prop({required:true})
    description: string;

    @Prop({required:true})
    prix: string;

    @Prop()
    reduction?: string;

    @Prop({ type: SchemaTypes.ObjectId, ref:'categorie', required:true})
    category!: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref:'users'})
    client!: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref:'vendeur', required:true})
    vendeur!: Types.ObjectId;

    @Prop([{ type: SchemaTypes.ObjectId, ref:'favoris'}])
    favoris: Types.ObjectId[]

    @Prop([{ type: SchemaTypes.ObjectId, ref:'commentaire'}])
    commentaire: Types.ObjectId[]

    @Prop({ default: false }) 
    confirmed: boolean;

    @Prop({ default: false }) 
    isFavorited: boolean;

    @Prop({required:true})
    photo: string;

}
export const AnnonceSchema = SchemaFactory.createForClass(Annonce);

