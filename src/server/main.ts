import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { RootModule } from './root/root.module';

(async () => {
  const app = await NestFactory.create(RootModule);
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: { 'img-src': ["'self'", 'https: data:'] },
    }),
  );

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
})();
