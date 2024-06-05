import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Livros } from './Livros.entity';

@Entity('status', { schema: 'organizeme' })
export class Status {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 255 })
  nome: string;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @OneToMany(() => Livros, (livros) => livros.idStatus2)
  livros: Livros[];
}
