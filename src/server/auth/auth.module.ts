import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.secretKey,
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/auth',
      rootPath: join(__dirname, '../../src/client/html'),
    }),
  ],
})
export class AuthModule {}
