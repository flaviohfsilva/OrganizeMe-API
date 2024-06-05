import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('OrganizeMe')
    .setDescription('Documentação API OrganizeMe')
    .setVersion('1.0')
    .addTag('Tarefas')
    .addTag('Hábitos')
    .addTag('Biblioteca')
    .addTag('Tags')
    .addTag('Status')
    // .addTag('Newsletter')
    // .addTag('Verificacao')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3003);
}
bootstrap();
