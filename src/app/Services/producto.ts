import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Observable } from "rxjs";
import {Productos as ModeloProductos, ProductInput} from "../models/producto.model"



@Service()
export class Producto {
    private readonly url = 'https://fakestoreapi.com/products'

    private readonly http = inject(HttpClient)

    obtenerProducto():Observable<ModeloProductos[]>
    {
        return this.http.get<ModeloProductos[]>(this.url);
    }
    crearProducto (producto : ProductInput) {
    return this.http.post<ModeloProductos>(this.url, producto);

}

    //Actualizar Producto 
    actualizarProducto (id: number, producto : ProductInput) {
      return  this.http.put(`${this.url} /${id}`, producto);
    }

    // Elimar Producto
    eliminarProducto(id: number) {
        return this.http.delete<Producto>( `${this.url} /${id}`);
        

}

 
getCategories():Observable<string[]>{
    return this.http.get<string[]>(`${this.url}/categories`);
  }

}