import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from '../dto/create-libro.dto';
import { UpdateLibroDto } from '../dto/update-libro.dto';
import { Libro } from '../entities/libro.entity';

@ApiTags('libros')
@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo libro' })
  @ApiResponse({ status: 201, description: 'Libro creado exitosamente', type: Libro })
  create(@Body(ValidationPipe) createLibroDto: CreateLibroDto): Promise<Libro> {
    return this.librosService.create(createLibroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los libros' })
  @ApiResponse({ status: 200, description: 'Lista de libros', type: [Libro] })
  findAll(): Promise<Libro[]> {
    return this.librosService.findAll();
  }

  @Get('categoria/:categoriaId')
  @ApiOperation({ summary: 'Obtener libros por categoría' })
  @ApiResponse({ status: 200, description: 'Libros de la categoría', type: [Libro] })
  findByCategoria(@Param('categoriaId') categoriaId: string): Promise<Libro[]> {
    return this.librosService.findByCategoria(+categoriaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener libro por ID' })
  @ApiResponse({ status: 200, description: 'Libro encontrado', type: Libro })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  findOne(@Param('id') id: string): Promise<Libro> {
    return this.librosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar libro' })
  @ApiResponse({ status: 200, description: 'Libro actualizado', type: Libro })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateLibroDto: UpdateLibroDto): Promise<Libro> {
    return this.librosService.update(+id, updateLibroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar libro' })
  @ApiResponse({ status: 200, description: 'Libro eliminado' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.librosService.remove(+id);
  }
}