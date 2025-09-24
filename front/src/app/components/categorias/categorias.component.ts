import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  nuevaCategoria: Omit<Categoria, 'id'> = { nombre: '', descripcion: '' };
  categoriaEditando: Categoria | null = null;
  mostrarFormulario = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.apiService.getCategorias().subscribe({
      next: (categorias) => this.categorias = categorias,
      error: (error) => console.error('Error al cargar categorías:', error)
    });
  }

  mostrarNuevaCategoria() {
    this.mostrarFormulario = true;
    this.categoriaEditando = null;
    this.nuevaCategoria = { nombre: '', descripcion: '' };
  }

  editarCategoria(categoria: Categoria) {
    this.mostrarFormulario = true;
    this.categoriaEditando = categoria;
    this.nuevaCategoria = { nombre: categoria.nombre, descripcion: categoria.descripcion };
  }

  guardarCategoria() {
    if (this.categoriaEditando) {
      this.apiService.updateCategoria(this.categoriaEditando.id, this.nuevaCategoria).subscribe({
        next: () => {
          this.cargarCategorias();
          this.cancelar();
        },
        error: (error) => console.error('Error al actualizar categoría:', error)
      });
    } else {
      this.apiService.createCategoria(this.nuevaCategoria).subscribe({
        next: () => {
          this.cargarCategorias();
          this.cancelar();
        },
        error: (error) => console.error('Error al crear categoría:', error)
      });
    }
  }

  eliminarCategoria(id: number) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.apiService.deleteCategoria(id).subscribe({
        next: () => this.cargarCategorias(),
        error: (error) => console.error('Error al eliminar categoría:', error)
      });
    }
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.categoriaEditando = null;
    this.nuevaCategoria = { nombre: '', descripcion: '' };
  }
}