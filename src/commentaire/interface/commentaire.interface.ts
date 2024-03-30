import {Document} from 'mongoose';

export interface ICommentaire extends Document{
    readonly contenu: string;
    readonly auteur: string;
    readonly annonce: string;
    confirmed: boolean;

}