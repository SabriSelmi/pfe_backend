import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true})
export class Commentaire extends Document {

    @Prop({required:true})
    contenu: string;
    @Prop({ type: SchemaTypes.ObjectId, ref:'users', required:true})
    auteur!: Types.ObjectId;
    @Prop({ default: false }) 
    confirmed: boolean;
    @Prop({ type: SchemaTypes.ObjectId, ref:'annonce', required:true})
    annonce!: Types.ObjectId;

}
export const CommentaireSchema = SchemaFactory.createForClass(Commentaire);

