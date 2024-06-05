import { Inject, Injectable } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Repository } from 'typeorm';
import { Tarefas } from 'src/entities/Tarefas.entity';
import { Retorno } from 'src/interfaces';
import { Habitos } from 'src/entities/Habitos.entity';

@Injectable()
export class TarefasService {
  constructor(
    @Inject('TAREFAS_REPOSITORY')
    private readonly TarefasRP: Repository<Tarefas>,
    @Inject('HABITOS_REPOSITORY')
    private readonly HabitosRP: Repository<Habitos>,
  ) {}

  create(createTarefaDto: CreateTarefaDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Tarefa criada com sucesso!',
    };

    try {
      console.log(createTarefaDto);
      createTarefaDto.dataHora = new Date();
      const task = this.TarefasRP.create(createTarefaDto);
      this.TarefasRP.save(task);
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao criar tarefa, ${error}`;
    }
  }

  findAll() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const task = this.TarefasRP.find({
        where: {
          ativo: true,
          habito: false,
        },
      });
      return task;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca, ${error}`;
    }
  }

  findAllTaskHabits() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const task = this.TarefasRP.find({
        where: {
          ativo: true,
        },
        relations: ['idHabito2'],
      });
      return task;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca, ${error}`;
    }
  }

  async addHabitTasksToRoutine(habitId: number): Promise<Retorno> {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Tarefas do hábito adicionadas à rotina com sucesso!',
      dados: [],
    };

    try {
      const habit = await this.HabitosRP.findOne({
        where: { id: habitId, ativo: true },
        relations: ['tarefas'],
      });

      if (!habit) {
        retorno.erro = true;
        retorno.mensagem = 'Hábito não encontrado';
        return retorno;
      }

      const tasksToAdd = habit.tarefas.map((task) => ({
        ...task,
        id: undefined, // Remova o ID para criar uma nova entrada
        habito: false, // Ajuste para false para diferenciar as tarefas na rotina
        dataHora: new Date(), // Ajuste a dataHora para o momento atual
      }));
      const taskAdded = await this.TarefasRP.save(tasksToAdd);
      retorno.dados = taskAdded;
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao adicionar tarefas do hábito à rotina, ${error}`;
      return retorno;
    }
  }

  findOne(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const task = this.TarefasRP.findOne({
        where: {
          id: id,
        },
      });
      return task;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca, ${error}`;
    }
  }

  async update(id: number, updateTarefaDto: UpdateTarefaDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Tarefa atualizada com sucesso!',
    };
    try {
      await this.TarefasRP.update(id, updateTarefaDto);
      return this.TarefasRP.findOne({ where: { id: id } });
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao atualizar tarefa! ${error}`;
      return retorno;
    }
  }

  async remove(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Tarefa excluída com sucesso!',
    };

    try {
      const task = await this.TarefasRP.find({
        where: {
          id: id,
        },
      });

      const excluir = this.TarefasRP.remove(task);
      return excluir;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir tarefa, ${error}`;
    }
  }
}
