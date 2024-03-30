import {Document} from 'mongoose';

export interface IUtilisateur extends Document{
    readonly socketId: string;
    readonly email: string;
    readonly nom: string;
    readonly username: string;
    readonly password: string;
    readonly adresse: string;
    readonly photo: string;
    refreshToken: string;

}