import { Module } from '@nestjs/common';
import { HabitosService } from './habitos.service';
import { HabitosController } from './habitos.controller';
import { DatabaseModule } from 'src/database/database.module';
import { habitosProviders } from './habitos.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [HabitosController],
  providers: [HabitosService, ...habitosProviders],
  exports: [HabitosService, ...habitosProviders],
})
export class HabitosModule {}
