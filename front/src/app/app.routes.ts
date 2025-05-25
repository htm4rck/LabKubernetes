import { Routes } from '@angular/router';
import {FacturaComponent} from './factura/factura.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {path: '', component: FacturaComponent},
  {
    path: 'factura',
    component: FacturaComponent
  }
];
