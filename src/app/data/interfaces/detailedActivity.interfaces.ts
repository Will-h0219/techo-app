import { VolunteerItem } from "./volunteer.interfaces";

export interface DetailedActivityInfo {
  id:                       number;
  temasTratados?:           string;
  compromisos?:             string;
  linkActa?:                string;
  generalidades:            Generalidades;
  nombre?:                  string;
  descripcion?:             string;
}

export interface Generalidades {
  id:               number;
  fechaJornada:     Date | string;
  esMesaTrabajo:    boolean;
  estado:           string;
  nombreVoluntario: string;
  comunidadId:      number;
  nombreComunidad:  string;
  asistentes:       VolunteerItem[];
  habitantesParticipantes: number;
}
