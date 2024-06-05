import { PartialType } from '@nestjs/swagger';
import { CreateGoogleBookDto } from './create-google-book.dto';

export class UpdateGoogleBookDto extends PartialType(CreateGoogleBookDto) {}
