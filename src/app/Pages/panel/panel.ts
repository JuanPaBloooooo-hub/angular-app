import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../Services/auth';
import { Productos as ModeloProducto, ProductInput, Productos } from '../../models/producto.model';
import { Producto, Producto as ServicioProducto } from '../../Services/producto';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-panel',
  styleUrl: './panel.css',
  templateUrl: './panel.html',
})
export class Panel {
  protected auth = inject(Auth);
   productos=signal<ModeloProducto[]>([]);
   
   producto=inject(ServicioProducto);
  editingId=signal<number | null>(null)
  categories=signal<string[]>([]);//Guarda categorias

  ngOnInit(){
    this.cargarProductos();
    this.producto.getCategories().subscribe((data) => this.categories.set(data));
  }

  cargarProductos(){
    this.producto.obtenerProducto().subscribe(
      {
        next:(dato)=>{
          this.productos.set(dato);
          console.log(dato);
        }
      }
    )

  }
  // Datos del formulario, enlazados con ngModel
  form: ProductInput = { title: '', price: 0, description: '', category: '', image: '' };

  save(): void {
    


    if (!this.form.title || !this.form.category || !this.form.image || this.form.price <= 0) {
      
      return;
    }


    const id = this.editingId();
    if (id === null) {
      this.create();
    } else {
      this.update(id);
    }
  }

   private create(): void {
    
     this.producto.crearProducto(this.form).subscribe({
      next: (product) => {
        this.productos.update((list) => [product, ...list]);
       
        this.cancel();
      },
      
    });
  }


  // UPDATE: guardar los cambios de un producto
  private update(id: number): void {
    this.producto.actualizarProducto(id, this.form).subscribe({
      next: (product) => {
        this.productos.update((list) =>
          list.map((item) => (item.id === id ? { ...item, ...product } : item))
        );
        
        this.cancel();
      },
      
    });
  }

    edit(product: Productos): void {
    this.editingId.set(product.id);
    this.form = { ...product };
  }


  // Limpia el formulario y sale del modo edición
  cancel(): void {
    this.editingId.set(null);
    this.form = { title: '', price: 0, description: '', category: '', image: '' };
  }


}
