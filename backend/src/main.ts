import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { main as seed } from 'prisma/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await seed();
  await app.listen(3000);
}
bootstrap();
