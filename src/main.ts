import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getCorsConfig } from './config';

async function bootstrap() {
  const isDevCorsEnabled = process.env.ENABLE_DEV_CORS === 'true';

  const app = await NestFactory.create(AppModule);
  app.enableCors(getCorsConfig(isDevCorsEnabled));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
