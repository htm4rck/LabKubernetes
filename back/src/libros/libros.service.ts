import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from '../entities/libro.entity';
import { CreateLibroDto } from '../dto/create-libro.dto';
import { UpdateLibroDto } from '../dto/update-libro.dto';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,
  ) {}

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const libro = this.libroRepository.create(createLibroDto);
    return await this.libroRepository.save(libro);
  }

  async findAll(): Promise<Libro[]> {
    return await this.libroRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }
    return libro;
  }

  async findByCategoria(categoriaId: number): Promise<Libro[]> {
    return await this.libroRepository.find({
      where: { categoriaId },
      relations: ['categoria'],
    });
  }

  async update(id: number, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    await this.libroRepository.update(id, updateLibroDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.libroRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }
  }
}