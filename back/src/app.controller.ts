import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  @ApiOperation({ summary: 'Mensaje de bienvenida' })
  getHello(): any {
    return {hola: 'mundo', servicio:'Books API'};
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('/')
  @ApiOperation({ summary: 'Sumar dos números' })
  sumar( @Body() hola:{numero1:number, numero2:number}): string {
    let resultado = hola.numero1 + hola.numero2;
    return "Books API - Suma: "+ resultado;
  }
}
