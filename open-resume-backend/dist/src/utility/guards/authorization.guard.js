"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AuthorizeGuard = class AuthorizeGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const allowedRoles = this.reflector.get('allowedRoles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const currentUser = request?.CurrentUser;
        if (!currentUser || !currentUser.roles || !Array.isArray(currentUser.roles)) {
            throw new common_1.UnauthorizedException('Sorry, you are not authorized');
        }
        const result = currentUser.roles.some((role) => allowedRoles.includes(role));
        if (!result) {
            throw new common_1.UnauthorizedException('Sorry, you are not authorized');
        }
        return true;
    }
};
exports.AuthorizeGuard = AuthorizeGuard;
exports.AuthorizeGuard = AuthorizeGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthorizeGuard);
//# sourceMappingURL=authorization.guard.js.map