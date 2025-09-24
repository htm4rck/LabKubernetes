import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Libro } from './libro.entity';

@Entity('categorias')
export class Categoria {
  @ApiProperty({ description: 'ID único de la categoría' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre de la categoría' })
  @Column({ length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Descripción de la categoría' })
  @Column({ length: 255 })
  descripcion: string;

  @ApiProperty({ type: () => [Libro], description: 'Libros de esta categoría' })
  @OneToMany(() => Libro, libro => libro.categoria)
  libros: Libro[];
}