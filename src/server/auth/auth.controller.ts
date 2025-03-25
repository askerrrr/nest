import { join } from 'path';
import { Response } from 'express';
import { Get, Res, Post, Body, Controller } from '@nestjs/common';

import { AuthDataDto } from './auth.guard.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async getAuthForm(@Res() res: Response) {
    return res.sendFile(join(__dirname, '../../src/client/html/authForm.html'));
  }

  @Post('login/check')
  async checkLogin(
    @Body() body: AuthDataDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    var { login, passwd } = body;

    var token = await this.authService.checkLogin(login, passwd);

    if (!token) {
      return res.redirect('/auth/login');
    }

    return res
      .cookie('token', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      })
      .json({ redirect: true });
  }
}
