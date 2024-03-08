import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'; // Ajoutez JsonWebTokenError
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

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.authorization;
    if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer')) {
      next();
      return;
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, { ignoreExpiration: true }) as JwtPayload; // Ajoutez { ignoreExpiration: true }
        const currentUser = await this.usersService.findOne(+id);
        req.currentUser = currentUser;
        next();
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          // Token expiré, essayez de rafraîchir le token
          const refreshToken = req.headers['refresh-token'];
          if (!refreshToken) {
            throw new Error('No refresh token provided');
          }
          try {
            const { id } = verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET_KEY) as JwtPayload; // Corrigez la vérification du token de rafraîchissement
            const currentUser = await this.usersService.findOne(+id);
            const newAccessToken = await this.usersService.accessToken(currentUser);
            // Ajoutez le nouveau token d'accès à l'en-tête de la réponse
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', `Bearer ${newAccessToken}`);
            req.currentUser = currentUser;
            next();
          } catch (error) {
            console.error('Error refreshing token:', error.message);
            req.currentUser = null;
            next();
          }
        } else if (error instanceof JsonWebTokenError) { // Ajoutez une gestion spécifique pour les erreurs de vérification du token JWT
          console.error('JWT verification error:', error.message);
          req.currentUser = null;
          next();
        } else {
          console.error('Error in CurrentUserMiddleware:', error.message);
          req.currentUser = null;
          next();
        }
      }
    }
  }
}

interface JwtPayload {
  id: string;
}
