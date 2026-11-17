import { Routes } from '@angular/router';
import { Productos } from './Pages/productos/productos';
import { Home } from './home/home';
import { Login } from './Pages/login/login';
import { Usuario } from './usuario/usuario';
import { authGuard } from './guards/auth-guard';
import { Admin } from './admin/admin';
import { adminGuard } from './guards/admin-guard';
import { Panel } from './Pages/panel/panel';

export const routes: Routes = [
   {path: '', component: Productos, pathMatch: 'full'},
   {path: 'login', component: Login},

   //protegida
   {path: 'usuario', component: Usuario, canActivate:[authGuard]},

   //Protegida admin
   {path: 'admin', component: Admin,canActivate: [adminGuard]},

   {path: 'panel',component: Panel,canActivate:[authGuard]},
    
];
