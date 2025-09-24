export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  libros?: Libro[];
}

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  categoriaId: number;
  categoria?: Categoria;
}