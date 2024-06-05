import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Biblioteca')
@Controller('biblioteca')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Post()
  create(@Body() createBibliotecaDto: CreateBibliotecaDto) {
    return this.bibliotecaService.create(createBibliotecaDto);
  }

  @Get()
  findAll() {
    return this.bibliotecaService.findAll();
  }

  @Get('booksByStatus')
  findAllBooksByStatus() {
    return this.bibliotecaService.findBooksByStatus();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bibliotecaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBibliotecaDto: UpdateBibliotecaDto,
  ) {
    return this.bibliotecaService.update(+id, updateBibliotecaDto);
  }

  @Patch(':id/:paginalAtual')
  updateReadPages(
    @Param('id', ParseIntPipe) id: number,
    @Body('paginaAtual', ParseIntPipe) pagesRead: number,
  ) {
    return this.bibliotecaService.updatePagesRead(id, pagesRead);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bibliotecaService.remove(+id);
  }

  // O 'q' significa Query
  @Get('buscarLivro/:livro')
  searchBooks(@Param('livro') livro: string) {
    console.log('Item pesquisado: ', livro);
    return this.bibliotecaService.searchBooks(livro);
  }
}
