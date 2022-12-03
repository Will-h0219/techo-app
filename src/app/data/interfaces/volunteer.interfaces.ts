export interface VolunteerItem {
  id: number;
  nombre: string;
  estado: string;
}

export interface VolunteerPerCommunity {
  id: number;
  nombre: string;
  voluntarios: VolunteerItem[];
}