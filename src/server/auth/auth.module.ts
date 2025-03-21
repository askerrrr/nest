import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RootModule } from '../root/root.module';
import { AuthController } from './auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => RootModule),
    JwtModule.register({
      global: true,
      secret: 'asker',
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/auth',
      rootPath: join(__dirname, '../../src/client/html'),
    }),
  ],
})
export class AuthModule {}
