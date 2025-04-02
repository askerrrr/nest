import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { RootModule } from './root/root.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

(async () => {
  var app = await NestFactory.create(RootModule, {
    logger: new ConsoleLogger({
      colors: true,
      timestamp: false,
      logLevels: ['error', 'fatal', 'warn'],
    }),
  });

  app.enableCors();
  app.use(
    helmet.contentSecurityPolicy({ directives: { defaultSrs: ["'self'"] } }),
  );

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  var configService = app.get(ConfigService);
  var port = configService.get('PORT');
  var host = configService.get('HOST');

  await app.listen(port, host, () =>
    console.log(`Server is running on http://${host}:${port}`),
  );
})();
