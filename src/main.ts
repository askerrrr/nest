import { NestFactory } from '@nestjs/core';
import { RootModule } from './root/root.module';

(async () => {
  const app = await NestFactory.create(RootModule);
  await app.listen(process.env.PORT ?? 3000);
})();
