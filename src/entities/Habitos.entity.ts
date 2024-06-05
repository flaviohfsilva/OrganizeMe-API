import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tarefas } from './Tarefas.entity';

@Entity('habitos', { schema: 'organizeme' })
export class Habitos {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 255 })
  nome: string;

  @Column('varchar', { name: 'titulo', length: 255 })
  titulo: string;

  @Column('varchar', { name: 'sub_titulo', length: 255 })
  subTitulo: string;

  @Column('varchar', { name: 'descricao', length: 10000 })
  descricao: string;

  @Column('datetime', { name: 'data_hora' })
  dataHora: Date;

  @Column('varchar', { name: 'img', length: 245 })
  img: string;

  @Column('varchar', { name: 'thumb_img', length: 245 })
  thumbImg: string;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @OneToMany(() => Tarefas, (tarefas) => tarefas.idHabito2)
  tarefas: Tarefas[];
}
