import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  Get,
  Post,
  Bind,
  Body,
  Req,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login/check')
  async checkLogin(@Req() res: Response, @Body() body: any) {
    return await this.authService.checkLogin(res, body);
  }
}
