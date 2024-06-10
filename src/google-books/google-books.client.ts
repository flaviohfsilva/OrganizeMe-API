import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateBibliotecaDto } from 'src/biblioteca/dto/create-biblioteca.dto';

@Injectable()
export class BookApiClient {
  constructor(private readonly httpService: HttpService) {}

  async search(query: string): Promise<CreateBibliotecaDto[]> {
    console.log('Client - Chegou aqui: ', query);
    const apiKey = process.env.BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const books = response.data.items.map((dados) => {
        const volumeInfo = dados.volumeInfo;
        return {
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
          paginaTotal: volumeInfo.pageCount || 0,
          dataHora: null,
          idStatus: null,
          paginaAtual: 0,
        } as unknown as CreateBibliotecaDto;
      });
      return books;
    } catch (error) {
      console.log('Erro na busca do livro: ', error);
      throw error;
    }
  }
}
