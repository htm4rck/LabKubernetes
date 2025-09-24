import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './categorias/categorias.module';
import { LibrosModule } from './libros/libros.module';
import { Categoria } from './entities/categoria.entity';
import { Libro } from './entities/libro.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_PATH || './database.sqlite',
      entities: [Categoria, Libro],
      synchronize: true,
    }),
    CategoriasModule,
    LibrosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
