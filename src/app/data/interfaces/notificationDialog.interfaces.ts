import { Params } from "@angular/router";

export interface NotificationDialog {
  type: 'success' | 'warn' | 'error';
  title: string;
  content?: string;
  routeParam?: string;
  queryParam?: Params;
}