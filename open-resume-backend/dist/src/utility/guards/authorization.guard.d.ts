import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
export declare class AuthorizeGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
