import {Document} from 'mongoose';
import { IUtilisateur } from 'src/utilisateur/interface/utilisateur.interface';

export interface IAdministrateur extends IUtilisateur{
    readonly privileges: string;
}