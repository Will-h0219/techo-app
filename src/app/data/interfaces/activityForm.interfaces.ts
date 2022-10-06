export interface ActivityFormValue {
  comunidadId: number;
  fechaJornada: string;
  esMesaTrabajo: boolean;
  voluntariosIds: number[];
  mesaTrabajo?: MesaTrabajoGroup;
  actividadAlternativa?: ActividadAlternativaGroup;
}

export interface MesaTrabajoGroup {
  temasTratados: string;
  compromisos: string;
  numeroHabitantes: number;
  linkActa?: string;
}

export interface ActividadAlternativaGroup {
  actividadesRealizadas: string;
  descripcionActividad: string;
}