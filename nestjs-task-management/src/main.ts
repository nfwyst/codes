import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  const port = config.get('server.port') as number
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
