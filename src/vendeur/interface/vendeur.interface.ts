import {Document} from 'mongoose';
import { IUtilisateur } from 'src/utilisateur/interface/utilisateur.interface';

export interface IVendeur extends IUtilisateur{
    readonly domaine: string;
    confirmed: boolean;

}