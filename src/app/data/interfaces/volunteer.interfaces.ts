export interface VolunteerItem {
  id: number;
  nombres: string;
}

export interface VolunteerPerCommunity {
  id: number;
  nombre: string;
  voluntarios: VolunteerItem[];
}