export interface Restaurante {
  id: string;
  descripcion: string;
  url: string;
  titulo: string;
  localidad: string;
  menu: Producto[];
}

export interface ItemPedido {
  producto: Producto;
  cantidad: number;
}

export interface PedidoItems {
  items: ItemPedido[];
  restaurante: string;
}

export interface Producto {
    id: string;
    descripcion: string;
    url: string;
    titulo: string;
    precio: number;
}
