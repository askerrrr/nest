import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    var request = context.switchToHttp().getRequest();
    var response = context.switchToHttp().getResponse<Response>();
    var token = request.cookies?.token;

    if (!token) {
      response.redirect('/auth/login');
      throw new UnauthorizedException();
    }
    try {
      var payload = await this.jwtService.verifyAsync(token, {
        secret: 'asker',
      });

      request['user'] = payload;
    } catch {
      response.redirect('/auth/login');
      throw new UnauthorizedException();
    }
    return true;
  }
}
