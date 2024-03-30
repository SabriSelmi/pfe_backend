import {Document} from 'mongoose';

export interface IAnnonce extends Document{
    readonly titre: string;
    readonly description: string;
    readonly prix: string;
    readonly reduction?: string;
    readonly category: string;
    readonly client: string;
    readonly vendeur: string;
    readonly photo: string;
    confirmed: boolean;
    isFavorited: boolean;

}