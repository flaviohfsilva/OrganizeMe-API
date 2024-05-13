import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasModule } from './tarefas/tarefas.module';
import { HabitosModule } from './habitos/habitos.module';
import { BibliotecaModule } from './biblioteca/biblioteca.module';

@Module({
  imports: [TarefasModule, HabitosModule, BibliotecaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
