import { Component, inject } from '@angular/core';
import { Router, RouterLink,  } from '@angular/router';
import { Auth } from '../../Services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
protected auth= inject(Auth);
private router = inject(Router);

salir(): void {
this.auth.logout();
this.router.navigateByUrl('/login');
}
}
