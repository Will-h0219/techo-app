export interface ActivityFormValue {
  comunidadId: number;
  fechaJornada: string;
  esMesaTrabajo: boolean;
  numeroHabitantes: number;
  voluntariosIds: number[];
  mesaTrabajo?: MesaTrabajoGroup;
  actividadAlternativa?: ActividadAlternativaGroup;
}

export interface MesaTrabajoGroup {
  temasTratados: string;
  compromisos: string;
  linkActa?: string;
}

export interface ActividadAlternativaGroup {
  actividadesRealizadas: string;
  descripcionActividad: string;
}