import { Inject, Injectable } from '@nestjs/common';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { BookApiClient } from 'src/google-books/google-books.client';
import { Repository } from 'typeorm';
import { Livros } from 'src/entities/Livros.entity';
import { Retorno } from 'src/interfaces';

@Injectable()
export class BibliotecaService {
  constructor(
    @Inject('BIBLIOTECA_REPOSITORY')
    private readonly BibliotecaRP: Repository<Livros>,
    private readonly bibliotecaClient: BookApiClient,
  ) {}

  create(createBibliotecaDto: CreateBibliotecaDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Livro criado com sucesso!',
    };

    try {
      console.log(createBibliotecaDto);
      createBibliotecaDto.dataHora = new Date();
      const habits = this.BibliotecaRP.create(createBibliotecaDto);
      this.BibliotecaRP.save(habits);
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao criar livro, ${error}`;
    }
  }

  findAll() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const book = this.BibliotecaRP.find({
        where: {
          ativo: true,
        },
      });

      return book;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar buscar ${error}`;
    }
  }

  findBooksByStatus() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const book = this.BibliotecaRP.find({
        where: {
          ativo: true,
        },
        relations: ['idStatus2'],
      });
      return book;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar buscar ${error}`;
    }
  }

  findOne(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const book = this.BibliotecaRP.findOne({
        where: {
          id: id,
        },
      });

      return book;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar buscar ${error}`;
    }
  }

  async update(id: number, updateBibliotecaDto: UpdateBibliotecaDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Livro atualizado com sucesso!',
    };

    try {
      await this.BibliotecaRP.update(id, updateBibliotecaDto);
      return this.BibliotecaRP.findOne({ where: { id: id } });
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao atualizar livro ${error}`;
    }
  }

  async updatePagesRead(id: number, pageRead: number) {
    const book = await this.BibliotecaRP.findOne({
      where: {
        id: id,
      },
    });

    const paginaTotal = book.paginaTotal;
    book.paginaAtual = pageRead;
    console.log('Página total: ', paginaTotal, '|', 'Página atual: ', pageRead);
    await this.BibliotecaRP.save(book);
    return this.calculatePercentBook(pageRead, paginaTotal);
  }

  async remove(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Livro excluído com sucesso!',
    };

    try {
      const books = await this.BibliotecaRP.findOne({
        where: {
          id: id,
        },
      });

      const excluir = this.BibliotecaRP.remove(books);
      return excluir;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir livro, ${error}`;
    }
  }

  async searchBooks(livro: string) {
    console.log('Busca: ', livro);
    const search = await this.bibliotecaClient.search(livro);
    return search;
  }

  async saveBook(createBibliotecaDto: CreateBibliotecaDto, idStatus: number) {
    createBibliotecaDto.idStatus = idStatus;
    return this.create(createBibliotecaDto);
  }

  calculatePercentBook(paginaAtual: number, paginaTotal: number): number {
    if (paginaAtual == 0) {
      return 0;
    }

    const percentage = (paginaAtual / paginaTotal) * 100;
    console.log('Percentage: ', percentage);
    return percentage;
  }
}
