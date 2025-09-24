import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from './categoria.entity';

@Entity('libros')
export class Libro {
  @ApiProperty({ description: 'ID único del libro' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Título del libro' })
  @Column({ length: 200 })
  titulo: string;

  @ApiProperty({ description: 'Autor del libro' })
  @Column({ length: 100 })
  autor: string;

  @ApiProperty({ description: 'ISBN del libro' })
  @Column({ length: 20, unique: true })
  isbn: string;

  @ApiProperty({ description: 'ID de la categoría' })
  @Column()
  categoriaId: number;

  @ApiProperty({ type: () => Categoria, description: 'Categoría del libro' })
  @ManyToOne(() => Categoria, categoria => categoria.libros)
  @JoinColumn({ name: 'categoriaId' })
  categoria: Categoria;
}