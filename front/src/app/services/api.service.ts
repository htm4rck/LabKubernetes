import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, Libro } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseUrl}/categorias/${id}`);
  }

  createCategoria(categoria: Omit<Categoria, 'id'>): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseUrl}/categorias`, categoria);
  }

  updateCategoria(id: number, categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.baseUrl}/categorias/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categorias/${id}`);
  }

  // Libros
  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}/libros`);
  }

  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.baseUrl}/libros/${id}`);
  }

  getLibrosByCategoria(categoriaId: number): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}/libros/categoria/${categoriaId}`);
  }

  createLibro(libro: Omit<Libro, 'id'>): Observable<Libro> {
    return this.http.post<Libro>(`${this.baseUrl}/libros`, libro);
  }

  updateLibro(id: number, libro: Partial<Libro>): Observable<Libro> {
    return this.http.patch<Libro>(`${this.baseUrl}/libros/${id}`, libro);
  }

  deleteLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/libros/${id}`);
  }
}