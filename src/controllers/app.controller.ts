import { Controller, Get } from '@nestjs/common';

import { UserService } from '../services/user/user.service';
import { User } from '../entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

 
 
}
