import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor() {}
  @Get()
  @ApiOperation({ summary: 'Mensaje de bienvenida' })
  getHello(): any {
    return { hola: 'mundo', servicio: 'LabKubernetes API' };
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
  summary({ hola }: { hola: { numero1: number; numero2: number } }): string {
    const result = hola.numero1 + hola.numero2;
    return 'LabKubernetes API - Suma: ' + result;
  }
}
