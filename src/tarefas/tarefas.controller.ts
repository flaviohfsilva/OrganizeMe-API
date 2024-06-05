import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tarefas')
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Post()
  create(@Body() createTarefaDto: CreateTarefaDto) {
    return this.tarefasService.create(createTarefaDto);
  }

  @Get()
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get('habitos')
  findAllTaskHabits() {
    return this.tarefasService.findAllTaskHabits();
  }

  @Get('AdicionarTaskNaRotina/:id')
  addAllTaskHabits(@Param('id') id: number) {
    return this.tarefasService.addHabitTasksToRoutine(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarefasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarefaDto: UpdateTarefaDto) {
    return this.tarefasService.update(+id, updateTarefaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarefasService.remove(+id);
  }
}
