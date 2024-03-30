import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import * as argon2 from 'argon2';


@Schema({ timestamps: true, discriminatorKey:"role"})
export class Utilisateur extends Document {
    @Prop()
    socketId: string;

    @Prop({required:true})
    email: string;

    @Prop({required:true})
    nom: string;

    @Prop({required:true})
    username: string;

    @Prop({required:true})
    password: string;

    @Prop({required:true})
    adresse: string;

    @Prop({required:true})
    photo: string;

    @Prop([{ type: SchemaTypes.ObjectId, ref:'annonce'}])
    annonces: Types.ObjectId[]
    @Prop([{ type: SchemaTypes.ObjectId, ref:'commentaire'}])
    commentaires: Types.ObjectId[]
    @Prop([{ type: SchemaTypes.ObjectId, ref:'favoris'}])
    favoris: Types.ObjectId[]
    @Prop([{ type: SchemaTypes.ObjectId, ref:'annonce'}])
    annoncesPub: Types.ObjectId[]

    @Prop()
    refreshToken: string;
}
export const UserSchema = SchemaFactory.createForClass(Utilisateur).pre("save", async function(){
    this.password = await argon2.hash(this.password);
});

