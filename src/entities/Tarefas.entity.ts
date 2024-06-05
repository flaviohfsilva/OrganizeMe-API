import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habitos } from './Habitos.entity';

@Index('fk_tarefas_habitos_idx', ['idHabito'], {})
@Entity('tarefas', { schema: 'organizeme' })
export class Tarefas {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 255 })
  nome: string;

  @Column('varchar', { name: 'nome_tag', nullable: true, length: 255 })
  nomeTag: string | null;

  @Column('tinyint', { name: 'status', width: 1, default: () => "'0'" })
  status: boolean;

  @Column('tinyint', { name: 'ativo', width: 1, default: () => "'1'" })
  ativo: boolean;

  @Column('tinyint', { name: 'habito', width: 1, default: () => "'0'" })
  habito: boolean;

  @Column('datetime', { name: 'data_hora' })
  dataHora: Date;

  @Column('int', { name: 'tempo_inicio', nullable: true })
  tempoInicio: number | null;

  @Column('int', { name: 'tempo_final', nullable: true })
  tempoFinal: number | null;

  @Column('int', { name: 'id_habito', nullable: true })
  idHabito: number | null;

  @ManyToOne(() => Habitos, (habitos) => habitos.tarefas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_habito', referencedColumnName: 'id' }])
  idHabito2: Habitos;
}
