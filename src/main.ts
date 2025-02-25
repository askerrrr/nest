import { NestFactory } from '@nestjs/core';
import { RootModule } from './root/root.module';
import * as cookieParser from 'cookie-parser';

(async () => {
  const app = await NestFactory.create(RootModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
})();
