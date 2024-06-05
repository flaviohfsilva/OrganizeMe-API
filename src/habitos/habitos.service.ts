import { Inject, Injectable } from '@nestjs/common';
import { CreateHabitoDto } from './dto/create-habito.dto';
import { UpdateHabitoDto } from './dto/update-habito.dto';
import { Repository } from 'typeorm';
import { Habitos } from 'src/entities/Habitos.entity';
import { Retorno } from 'src/interfaces';

@Injectable()
export class HabitosService {
  constructor(
    @Inject('HABITOS_REPOSITORY')
    private readonly HabitosRP: Repository<Habitos>,
  ) {}

  create(createHabitoDto: CreateHabitoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Hábito criado com sucesso!',
    };

    try {
      console.log(createHabitoDto);
      createHabitoDto.dataHora = new Date();
      const habits = this.HabitosRP.create(createHabitoDto);
      this.HabitosRP.save(habits);
      return retorno;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao criar hábito, ${error}`;
    }
  }

  findAll() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const habits = this.HabitosRP.find({
        where: {
          ativo: true,
        },
      });

      return habits;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar buscar ${error}`;
    }
  }

  async findAllTaskHabits() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const habits = await this.HabitosRP.find({
        where: {
          ativo: true,
        },
        relations: ['tarefas'],
      });

      // Ordenar as tarefas dentro de cada hábito
      habits.forEach((habit) => {
        habit.tarefas.sort((a, b) => a.id - b.id); // Supondo que a propriedade de ordenação seja 'ordem'
      });

      return habits;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar buscar ${error}`;
    }
  }

  findOne(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const habits = this.HabitosRP.findOne({
        where: {
          id: id,
        },
      });
      return habits;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar buscar ${error}`;
    }
  }

  async update(id: number, updateHabitoDto: UpdateHabitoDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Hábito atualizado com sucesso!',
    };

    try {
      await this.HabitosRP.update(id, updateHabitoDto);
      return this.HabitosRP.findOne({ where: { id: id } });
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao atualizar hábito ${error}`;
    }
  }

  async remove(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Hábito excluído com sucesso!',
    };

    try {
      const habits = await this.HabitosRP.findOne({
        where: {
          id: id,
        },
      });

      const excluir = this.HabitosRP.remove(habits);
      return excluir;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir hábito, ${error}`;
    }
  }
}
