import { Livros } from 'src/entities/Livros.entity';
import { DataSource } from 'typeorm';

// Criação do repositório da Biblioteca
export const bibliotecaProviders = [
  {
    provide: 'BIBLIOTECA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Livros),
    inject: ['DATA_SOURCE'],
  },
];
