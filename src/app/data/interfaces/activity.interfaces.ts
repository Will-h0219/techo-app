export interface SimpleActivity {
  id: number;
  fechaJornada: Date;
  esMesaTrabajo: boolean;
  estado: string;
  nombreVoluntario: string;
  nombreComunidad: string;
  asistentes: number;
}

export interface NewActivityBody {
  comunidadId: number;
  voluntarioId: number;
  esMesaTrabajo: boolean;
  voluntariosIds: number[];
  fechaJornada: string;
  habitantesParticipantes: number;
  mesaTrabajo?: NewMesaTrabajo;
  actividadAlternativa?: NewActividadAlternativa;
}

export interface NewMesaTrabajo {
  temasTratados: string;
  compromisos: string;
  linkActa?: string;
}

export interface NewActividadAlternativa {
  nombre: string;
  descripcion: string;
}