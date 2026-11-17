export interface Rating {
    rate: number;
    count: number;
}

export interface Productos {
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:Rating;
}

// Extraccion de las propiedades de la interfaz Productos para crear un nuevo producto
export type  ProductInput = Pick<Productos, 'title' | 'price' | 'description' | 'category' | 'image'>;