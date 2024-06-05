import { Status } from 'src/entities/Status.entity';
import { DataSource } from 'typeorm';

// Criação do repositório dos Status
export const statusProviders = [
  {
    provide: 'STATUS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Status),
    inject: ['DATA_SOURCE'],
  },
];
