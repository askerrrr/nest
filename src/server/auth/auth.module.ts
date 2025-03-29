import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/adminData', {
      connectionName: 'admin',
    }),
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
