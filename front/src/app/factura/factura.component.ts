import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
export interface Factura {
  id?: string;           // Opcional para nuevas facturas
  numero?: string;        // Número de factura (ej: F-001-2023)
  fecha?: Date;           // Fecha de emisión
  cliente?: string;       // Nombre/Razón social del cliente
  rucCliente?: string;    // RUC/DNI del cliente
  direccionCliente?: string;
  subtotal?: number;
  igv?: number;           // 18% por defecto
  total?: number;
  estado?: 'pendiente' | 'pagada' | 'cancelada' | 'anulada';
  //items: FacturaItem[];  // Items de la factura
  createdAt?: Date;      // Fecha creación (automático)
  updatedAt?: Date;      // Fecha actualización (automático)
}

export interface FacturaItem {
  id?: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;      // cantidad * precioUnitario
}
@Component({
  selector: 'app-factura',
  imports: [
    // otros imports
    FormsModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent implements OnInit {
  factura_serie: string= 'F001-00000078';
  factura: Factura;
  constructor() {
    this.factura = {numero :this.factura_serie, total:0}
  }
  ngOnInit(): void {

      //throw new Error('Method not implemented.');
  }

  imprimir(){
    console.warn(this.factura)
  }

  registrar(){
    //api.registar (this.factura)
    // this.factura = {numero :Formulario1.get('numero')}

  }




}
