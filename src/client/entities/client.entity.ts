import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true})
export class Client extends Document {
    role: string;
    @Prop([{ type: SchemaTypes.ObjectId, ref:'annonce'}])
    annonces: Types.ObjectId[]
    @Prop([{ type: SchemaTypes.ObjectId, ref:'commentaire'}])
    commentaires: Types.ObjectId[]
    @Prop([{ type: SchemaTypes.ObjectId, ref:'favoris'}])
    favoris: Types.ObjectId[]

}
export const ClientSchema = SchemaFactory.createForClass(Client);

