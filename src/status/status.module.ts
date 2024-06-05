import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { statusProviders } from './status.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StatusController],
  providers: [StatusService, ...statusProviders],
})
export class StatusModule {}
