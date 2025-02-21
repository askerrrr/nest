import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  Get,
  Post,
  Bind,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Get()
  @Post('login/check')
  @Bind(Body())
  async checkLogin(body) {
    return await this.authService.checkLogin(body);
  }
}
