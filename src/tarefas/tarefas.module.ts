import { Module } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';
import { DatabaseModule } from 'src/database/database.module';
import { tarefasProviders } from './tarefas.providers';
import { HabitosModule } from 'src/habitos/habitos.module';

@Module({
  imports: [DatabaseModule, HabitosModule],
  controllers: [TarefasController],
  providers: [TarefasService, ...tarefasProviders],
})
export class TarefasModule {}
