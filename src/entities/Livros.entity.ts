import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './Status.entity';

@Index('fk_livros_status_idx', ['idStatus'], {})
@Entity('livros', { schema: 'organizeme' })
export class Livros {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 255 })
  nome: string;

  @Column('varchar', { name: 'editora', length: 255 })
  editora: string;

  @Column('varchar', { name: 'data_publicacao', length: 255 })
  dataPublicacao: string;

  @Column('varchar', { name: 'descricao', length: 2000 })
  descricao: string;

  @Column('varchar', { name: 'autor', length: 255 })
  autor: string;

  @Column('varchar', { name: 'isbn', length: 255 })
  isbn: string;

  @Column('varchar', { name: 'img', length: 255 })
  img: string;

  @Column('int', { name: 'pagina_total', default: 0 })
  paginaTotal: number;

  @Column('int', { name: 'pagina_atual', default: 0 })
  paginaAtual: number;

  @Column('datetime', { name: 'data_hora' })
  dataHora: Date;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('int', { name: 'id_status' })
  idStatus: number;

  @ManyToOne(() => Status, (status) => status.livros, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_status', referencedColumnName: 'id' }])
  idStatus2: Status[];
}
