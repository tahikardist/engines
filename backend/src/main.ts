import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.enableCors();
  app.useBodyParser('json', { limit: '10mb' });
  await app.listen(process.env.PORT);
}
bootstrap();
