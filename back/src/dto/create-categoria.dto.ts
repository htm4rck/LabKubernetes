import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ description: 'Descripción de la categoría', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  descripcion: string;
}