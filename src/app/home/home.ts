import { Component } from '@angular/core';
import { Productos } from '../Pages/productos/productos';
import { Navbar } from '../Pages/navbar/navbar';

@Component({
  imports: [Productos, Navbar],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
