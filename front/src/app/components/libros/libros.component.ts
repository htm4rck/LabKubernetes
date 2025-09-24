import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Libro, Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  categorias: Categoria[] = [];
  nuevoLibro: Omit<Libro, 'id'> = { titulo: '', autor: '', isbn: '', categoriaId: 0 };
  libroEditando: Libro | null = null;
  mostrarFormulario = false;
  filtroCategoria = 0;
  busqueda = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarLibros();
    this.cargarCategorias();
  }

  cargarLibros() {
    this.apiService.getLibros().subscribe({
      next: (libros) => this.libros = libros,
      error: (error) => console.error('Error al cargar libros:', error)
    });
  }

  cargarCategorias() {
    this.apiService.getCategorias().subscribe({
      next: (categorias) => this.categorias = categorias,
      error: (error) => console.error('Error al cargar categorías:', error)
    });
  }

  get librosFiltrados() {
    let resultado = this.libros;
    
    if (this.filtroCategoria > 0) {
      resultado = resultado.filter(libro => libro.categoriaId === this.filtroCategoria);
    }
    
    if (this.busqueda) {
      resultado = resultado.filter(libro => 
        libro.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        libro.autor.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
    
    return resultado;
  }

  mostrarNuevoLibro() {
    this.mostrarFormulario = true;
    this.libroEditando = null;
    this.nuevoLibro = { titulo: '', autor: '', isbn: '', categoriaId: 0 };
  }

  editarLibro(libro: Libro) {
    this.mostrarFormulario = true;
    this.libroEditando = libro;
    this.nuevoLibro = { 
      titulo: libro.titulo, 
      autor: libro.autor, 
      isbn: libro.isbn, 
      categoriaId: libro.categoriaId 
    };
  }

  guardarLibro() {
    if (this.libroEditando) {
      this.apiService.updateLibro(this.libroEditando.id, this.nuevoLibro).subscribe({
        next: () => {
          this.cargarLibros();
          this.cancelar();
        },
        error: (error) => console.error('Error al actualizar libro:', error)
      });
    } else {
      this.apiService.createLibro(this.nuevoLibro).subscribe({
        next: () => {
          this.cargarLibros();
          this.cancelar();
        },
        error: (error) => console.error('Error al crear libro:', error)
      });
    }
  }

  eliminarLibro(id: number) {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.apiService.deleteLibro(id).subscribe({
        next: () => this.cargarLibros(),
        error: (error) => console.error('Error al eliminar libro:', error)
      });
    }
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.libroEditando = null;
    this.nuevoLibro = { titulo: '', autor: '', isbn: '', categoriaId: 0 };
  }

  getNombreCategoria(categoriaId: number): string {
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  }
}