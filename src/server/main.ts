import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { RootModule } from './root/root.module';
import { ValidationPipe } from '@nestjs/common';

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
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //    // whitelist: true,
  //     transform: true,
  //     enableDebugMessages: true,
  //     //forbidNonWhitelisted: true,
  //   }),
  // );

  var configService = app.get(ConfigService);
  var port = configService.get('PORT');
  var host = configService.get('HOST');

  await app.listen(port, host, () =>
    console.log(`Server is running on http://${host}:${port}`),
  );
})();
