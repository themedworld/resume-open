import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private readonly usersService;
    constructor(usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
