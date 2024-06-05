import { Habitos } from 'src/entities/Habitos.entity';
import { DataSource } from 'typeorm';

// Criação do repositório dos Depoimentos/Histórias
export const habitosProviders = [
  {
    provide: 'HABITOS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Habitos),
    inject: ['DATA_SOURCE'],
  },
];
