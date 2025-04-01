import { join } from 'path';
import { Response } from 'express';
import { Get, Res, Post, Body, Controller } from '@nestjs/common';

import { AuthService } from './auth.service';

import { Redirect } from './dto/redirect-dto';
import { LoginCredentials } from './dto/loginCredentials-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async getAuthForm(@Res() res: Response): Promise<void> {
    return res.sendFile(join(__dirname, '../../src/client/html/authForm.html'));
  }

  @Post('login/check')
  async checkLogin(
    @Body() body: LoginCredentials,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response | Redirect> {
    var token: string | false = await this.authService.checkLogin(body);

    if (!token) res.redirect('/auth/login');

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    return { redirect: true };
  }
}
