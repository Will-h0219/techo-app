export interface VolunteerItem {
  id: number;
  nombre: string;
}

export interface VolunteerPerCommunity {
  id: number;
  nombre: string;
  voluntarios: VolunteerItem[];
}