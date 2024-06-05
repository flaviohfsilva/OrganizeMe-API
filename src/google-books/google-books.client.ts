import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateBibliotecaDto } from 'src/biblioteca/dto/create-biblioteca.dto';

@Injectable()
export class BookApiClient {
  constructor(private readonly httpService: HttpService) {}

  search(query: string) {
    console.log('Client - Chegou aqui: ', query);
    const apiKey = process.env.BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}=lite&key=${apiKey}`;
    try {
      const books = this.httpService.get(url).subscribe(
        (res) => {
          res.data.items.map((dados) => {
            const volumeInfo = dados.volumeInfo;
            const livros: CreateBibliotecaDto = {
              nome: volumeInfo.title,
              autor: volumeInfo.authors
                ? volumeInfo.authors.join(', ')
                : 'Desconhecido',
              editora: volumeInfo.publisher || 'Desconhecido',
              dataPublicacao: volumeInfo.publishedDate || 'Desconhecido',
              descricao: volumeInfo.description || 'Descrição não disponível',
              isbn: volumeInfo.industryIdentifiers
                ? volumeInfo.industryIdentifiers
                    .map((id) => id.identifier)
                    .join(', ')
                : 'No ISBN',
              img: volumeInfo.imageLinks
                ? volumeInfo.imageLinks.thumbnail
                : 'Imagem não disponível',
              paginalTotal: volumeInfo.pageCount || 0,
              dataHora: null,
              idStatus: null,
              paginaAtual: 0,
            };
            console.log(livros);
            return livros;
          });
          return books;
        },
        (error) => {
          console.log('Erro na busca do livro: ', error);
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
}
