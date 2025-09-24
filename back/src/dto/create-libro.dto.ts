import { IsNotEmpty, IsString, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibroDto {
  @ApiProperty({ description: 'Título del libro', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  titulo: string;

  @ApiProperty({ description: 'Autor del libro', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  autor: string;

  @ApiProperty({ description: 'ISBN del libro', maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  isbn: string;

  @ApiProperty({ description: 'ID de la categoría' })
  @IsNotEmpty()
  @IsNumber()
  categoriaId: number;
}