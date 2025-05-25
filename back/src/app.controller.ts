import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): any {
    return {hola: 'mundo', servicio:'de test'};
  }

  @Post('/')
  sumar( @Body() hola:{numero1:number, numero2:number}): string {
    let resultado = hola.numero1 + hola.numero2;
    return "Aplicacion Clase Angular, NestJS, Postgres: Clase 01: Prueba de suma!: "+ resultado;
  }
}
