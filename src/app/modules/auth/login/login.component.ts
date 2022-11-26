import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginBody } from 'src/app/data/interfaces/auth.interfaces';

import { AuthService } from '../../../../app/data/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required]]
  });

  get c() {
    return this.loginForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.invalid) return;

    let body: LoginBody = {
      email: this.c['userEmail'].value,
      password: this.c['userPassword'].value
    };
    
    this.authService.login(body).subscribe({
      next: (resp) => {
        if (resp.status !== 200) {
          this.snackBar.open('Email o contraseña incorrectos', 'OK', {
            duration: 4000,
            horizontalPosition: 'center'
          });
          return;
        }
        localStorage.setItem('userData', JSON.stringify(resp.result));
        this.snackBar.dismiss();
        this.router.navigateByUrl('/tablero');
      },
      error: (err: Error) => {
        console.log(err)
      }
    })
  }
}
