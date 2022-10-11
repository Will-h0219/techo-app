import { VolunteerItem } from "./volunteer.interfaces";

export interface DetailedActivityInfo {
  id:                       number;
  temasTratados?:           string;
  compromisos?:             string;
  linkActa?:                string;
  habitantesParticipantes?: number;
  generalidades:            Generalidades;
  nombre?:                  string;
  descripcion?:             string;
}

export interface Generalidades {
  id:               number;
  fechaJornada:     Date;
  esMesaTrabajo:    boolean;
  estado:           string;
  nombreVoluntario: string;
  nombreComunidad:  string;
  asistentes:       VolunteerItem[];
}
