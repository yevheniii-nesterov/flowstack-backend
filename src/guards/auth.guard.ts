// authentication.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '../config/auth.config';
import { Reflector } from '@nestjs/core';
//import {
//  REQUIRED_QUERY_PARAMS_KEY,
//  QueryParamConfig,
//} from '../decorators/required-query-params.decorator';
/*import { Role } from '../enums/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';*/

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('User is not authenticated');
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<AuthConfig>('auth')?.jwt.secret,
        ignoreExpiration: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      request['user'] = payload;

      /*const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (requiredRoles && requiredRoles.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const userRole = request.user?.role;

        if (!userRole) {
          throw new ForbiddenException('User role not found');
        }

        const hasRole = requiredRoles.includes(userRole);

        if (!hasRole) {
          throw new ForbiddenException('Insufficient permissions');
        }
      }*/

      /*const paramsConfig = this.reflector.get<QueryParamConfig[]>(
        REQUIRED_QUERY_PARAMS_KEY,
        context.getHandler(),
      );*/

      /*if (paramsConfig) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const userRole = request.user?.role;

        if (!userRole) {
          throw new BadRequestException('User role not found');
        }

        for (const paramConfig of paramsConfig) {
          const { paramName, config } = paramConfig;

          // Skip if no configuration exists for the current role
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (!config[userRole]) continue;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const roleConfig = config[userRole];
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          const queryParamValue = request.query[paramName];

          // Check if the parameter is required and present
          if (roleConfig.required && queryParamValue === undefined) {
            const errorMessage =
              roleConfig.errorMessage ||
              this.generateDefaultErrorMessage(userRole, paramName, 'required');
            throw new BadRequestException(errorMessage);
          }

          // Check if the parameter has a required value
          if (
            roleConfig.requiredValue !== undefined &&
            queryParamValue !== undefined
          ) {
            if (Array.isArray(roleConfig.requiredValue)) {
              if (
                !roleConfig.requiredValue.includes(queryParamValue as string)
              ) {
                const errorMessage =
                  roleConfig.errorMessage ||
                  this.generateDefaultErrorMessage(
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    userRole,
                    paramName,
                    'value',
                    roleConfig.requiredValue.join(' or '),
                  );
                throw new BadRequestException(errorMessage);
              }
            } else if (queryParamValue !== roleConfig.requiredValue) {
              const errorMessage =
                roleConfig.errorMessage ||
                this.generateDefaultErrorMessage(
                  userRole,
                  paramName,
                  'value',
                  roleConfig.requiredValue,
                );
              throw new BadRequestException(errorMessage);
            }
          }
        }
      }*/
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ForbiddenException
      ) {
        throw error; // Re-throw validation errors
      }
      throw new UnauthorizedException('User is not authenticated');
    }
    return true;
  }

  private generateDefaultErrorMessage(
    role: string,
    paramName: string,
    type: 'required' | 'value',
    requiredValue?: string,
  ): string {
    if (type === 'required') {
      return `${role} role must provide ${paramName} parameter`;
    } else {
      return `${role} role must provide ${paramName} parameter with value ${requiredValue}`;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
