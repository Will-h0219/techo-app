import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UnauthorizedDialogComponent } from "../shared/dialogs/unauthorized-dialog/unauthorized-dialog.component";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog,
    private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => this.handleError(error))
    )
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.dialog.open(UnauthorizedDialogComponent, {
        disableClose: true,
        data: {
          title: 'Tu sesión ha expirado!',
          content: 'Si el problema persiste comunicate con soporte.'
        }
      });
      setTimeout(() => {
        this.router.navigate(['/auth']);
        this.dialog.closeAll();
      }, 3000);
    }

    return throwError(() => error);
  }
}