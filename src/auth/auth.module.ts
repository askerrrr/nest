import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'asker',
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/auth',
      rootPath: join(__dirname, '..', '..', 'client', 'html', 'authForm.html'),
    }),
  ],
})
export class AuthModule {}
