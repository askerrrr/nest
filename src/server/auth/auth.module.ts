import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { Admin, AdminSchema } from '../schemas/admin.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost/adminData'),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.secretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
