import {Appartement} from './appartement.model';
import {client} from './client.model';

export class reservation {
  appratement?: Appartement;
  client?: client
  id?: any;
  datedebut?: Date;
  datefin?: Date;
  prixloyer?: any;
  paye?: boolean;
  reduction?: any;
  nombredenuite?: any;
  prixparnuite?: any;
  avance?: any;
  feedbackclient?: string;
  feedbackproprio?: string;
  nombrenuitgratuit?: any;
  nombredemois?: string;
  oknok?:string;
  bruit?:boolean;
  casse?:boolean;
  

}