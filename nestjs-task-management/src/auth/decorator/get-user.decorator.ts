import { createParamDecorator } from '@nestjs/common';
import { User } from '../user.entity';
import { Request } from 'express';

export const GetUser = createParamDecorator((data, req: Request): User => {
  return req.user as User
})
