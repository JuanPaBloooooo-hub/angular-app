import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../Services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  readonly form = new FormGroup({
    usuario: new FormControl('',{ nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('',{ nonNullable: true, validators: [Validators.required]})
  });

  private auth = inject(Auth);
  private router = inject(Router);
  loading = signal(false);

  error= signal('');

  protected invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.touched && control.invalid;
  }

  envio(): void {
    if (this.form.invalid) {
     
      return;
    }

    console.log(this.form.value)

    const { usuario, password } = this.form.getRawValue();

    this.auth.login(usuario , password).subscribe({
      next: () => {
        this.loading.set(true);
        console.log("Listo")
       
      },
      error: (error) => {
        this.loading.set(false)
        this.error.set(
          error.status === 401? 'Usuario o contraseña incorrectos': 'No se puede conectar'
        )
       
      }
    });
  }
}