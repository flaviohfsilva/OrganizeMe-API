import { Inject, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Repository } from 'typeorm';
import { Status } from 'src/entities/Status.entity';
import { Retorno } from 'src/interfaces';

@Injectable()
export class StatusService {
  constructor(
    @Inject('STATUS_REPOSITORY')
    private readonly StatusRP: Repository<Status>,
  ) {}

  create(createStatusDto: CreateStatusDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Status criado com sucesso!',
    };

    try {
      console.log(createStatusDto);
      const status = this.StatusRP.create(createStatusDto);
      this.StatusRP.save(status);
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
      const status = this.StatusRP.find({
        where: {
          ativo: true,
        },
      });
      return status;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca, ${error}`;
    }
  }

  findAllBooksByStatus() {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const status = this.StatusRP.find({
        where: {
          ativo: true,
        },
        relations: ['livros'],
      });
      return status;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca, ${error}`;
    }
  }

  findOne(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Busca realizada com sucesso!',
    };

    try {
      const status = this.StatusRP.findOne({
        where: {
          id: id,
        },
      });
      return status;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao realizar busca, ${error}`;
    }
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Status atualizado com sucesso!',
    };
    try {
      await this.StatusRP.update(id, updateStatusDto);
      return this.StatusRP.findOne({ where: { id: id } });
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao atualizar status! ${error}`;
      return retorno;
    }
  }

  async remove(id: number) {
    const retorno: Retorno = {
      erro: false,
      mensagem: 'Status excluido com sucesso!',
    };

    try {
      const status = await this.StatusRP.find({
        where: {
          id: id,
        },
      });

      const excluir = this.StatusRP.remove(status);
      return excluir;
    } catch (error) {
      retorno.erro = true;
      retorno.mensagem = `Erro ao excluir status, ${error}`;
    }
  }
}
