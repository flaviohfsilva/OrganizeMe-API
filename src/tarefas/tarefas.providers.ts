import { Tarefas } from 'src/entities/Tarefas.entity';
import { DataSource } from 'typeorm';

// Criação do repositório dos Depoimentos/Histórias
export const tarefasProviders = [
  {
    provide: 'TAREFAS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tarefas),
    inject: ['DATA_SOURCE'],
  },
];
