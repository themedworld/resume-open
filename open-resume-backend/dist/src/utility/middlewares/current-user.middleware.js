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
exports.CurrentUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const users_service_1 = require("../../users/users.service");
let CurrentUserMiddleware = class CurrentUserMiddleware {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async use(req, res, next) {
        const authHeader = req.headers.authorization || req.headers.authorization;
        if (!authHeader || (0, class_validator_1.isArray)(authHeader) || !authHeader.startsWith('Bearer')) {
            next();
            return;
        }
        else {
            try {
                const token = authHeader.split(' ')[1];
                const { id } = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET_KEY, { ignoreExpiration: true });
                const currentUser = await this.usersService.findOne(+id);
                req.currentUser = currentUser;
                next();
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                    const refreshToken = req.headers['refresh-token'];
                    if (!refreshToken) {
                        throw new Error('No refresh token provided');
                    }
                    try {
                        const { id } = (0, jsonwebtoken_1.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
                        const currentUser = await this.usersService.findOne(+id);
                        const newAccessToken = await this.usersService.accessToken(currentUser);
                        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                        req.currentUser = currentUser;
                        next();
                    }
                    catch (error) {
                        console.error('Error refreshing token:', error.message);
                        req.currentUser = null;
                        next();
                    }
                }
                else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    console.error('JWT verification error:', error.message);
                    req.currentUser = null;
                    next();
                }
                else {
                    console.error('Error in CurrentUserMiddleware:', error.message);
                    req.currentUser = null;
                    next();
                }
            }
        }
    }
};
exports.CurrentUserMiddleware = CurrentUserMiddleware;
exports.CurrentUserMiddleware = CurrentUserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], CurrentUserMiddleware);
//# sourceMappingURL=current-user.middleware.js.map