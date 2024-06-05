import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BookApiClient } from './google-books.client';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [BookApiClient],
  exports: [BookApiClient],
})
export class GoogleBooksModule {}
