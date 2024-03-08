"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeRoles = void 0;
const common_1 = require("@nestjs/common");
const AuthorizeRoles = (...roles) => (0, common_1.SetMetadata)('allowedRoles', roles);
exports.AuthorizeRoles = AuthorizeRoles;
//# sourceMappingURL=authorize-roles.decorator.js.map