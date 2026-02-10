import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: (err: any, user: any) => void): any {
    done(null, user.id);
  }

  async deserializeUser(payload: any, done: (err: any, payload: any) => void): Promise<any> {
    const user = await this.authService.findOne(payload);
    done(null, user);
  }
}
