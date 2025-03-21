import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { RootModule } from './root/root.module';

(async () => {
  var app = await NestFactory.create(RootModule);

  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
      },
    }),
  );

  app.use(cookieParser());

  var configService = app.get(ConfigService);
  var port = configService.get('PORT');
  var host = configService.get('HOST');

  await app.listen(port, host, () =>
    console.log(`Server is running on http://${host}:${port}`),
  );
})();
