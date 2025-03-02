import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { RootModule } from './root/root.module';

(async () => {
  const app = await NestFactory.create(RootModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
})();
