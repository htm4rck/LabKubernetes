import { Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { LibrosComponent } from './components/libros/libros.component';

export const routes: Routes = [
  { path: '', redirectTo: '/libros', pathMatch: 'full' },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'libros', component: LibrosComponent },
  { path: '**', redirectTo: '/libros' }
];
