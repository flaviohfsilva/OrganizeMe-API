import { Module } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaController } from './biblioteca.controller';
import { HttpModule } from '@nestjs/axios';
import { bibliotecaProviders } from './biblioteca.providers';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleBooksModule } from 'src/google-books/google-books.module';

@Module({
  imports: [HttpModule, DatabaseModule, GoogleBooksModule],
  controllers: [BibliotecaController],
  providers: [BibliotecaService, ...bibliotecaProviders],
})
export class BibliotecaModule {}
