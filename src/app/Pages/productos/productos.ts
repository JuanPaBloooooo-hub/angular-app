
import { Component, inject,signal } from '@angular/core';
import { Productos as ModeloProducto } from '../../models/producto.model';
import { Producto as ServicioProducto } from '../../Services/producto';

@Component({
  imports: [],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {
  productos=signal<ModeloProducto[]>([]);
  private producto=inject(ServicioProducto);

  ngOnInit(){
    this.producto.obtenerProducto().subscribe(
      {
        next:(dato)=>{
          this.productos.set(dato);
          console.log(dato);
        }
      }
    )
  }
}
