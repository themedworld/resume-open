import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthenticationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
