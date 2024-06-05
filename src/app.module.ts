import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasModule } from './tarefas/tarefas.module';
import { HabitosModule } from './habitos/habitos.module';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { StatusModule } from './status/status.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleBooksModule } from './google-books/google-books.module';

@Module({
  imports: [
    TarefasModule,
    HabitosModule,
    BibliotecaModule,
    StatusModule,
    ConfigModule.forRoot(),
    GoogleBooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
