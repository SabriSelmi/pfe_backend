import {Document} from 'mongoose';

export interface IFavoris extends Document{
    readonly annonce: string;
    readonly user: string;
}