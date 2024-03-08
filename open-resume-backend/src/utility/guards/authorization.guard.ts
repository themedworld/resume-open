import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthenticationGuard } from './authentication.guard';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const allowedRoles = this.reflector.get<string[]>('allowedRoles', context.getHandler());

        const request = context.switchToHttp().getRequest();
        const currentUser = request?.CurrentUser;

        if (!currentUser || !currentUser.roles || !Array.isArray(currentUser.roles)) {
            throw new UnauthorizedException('Sorry, you are not authorized');
        }

        const result = currentUser.roles.some((role: string) => allowedRoles.includes(role));

        if (!result) {
            throw new UnauthorizedException('Sorry, you are not authorized');
        }

        return true;
    }
}
