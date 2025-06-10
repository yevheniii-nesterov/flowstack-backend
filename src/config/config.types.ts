import { AuthConfig } from './auth.config';
import { z as zod } from 'zod';

export interface ConfigType {
    auth: AuthConfig;
}

export const appConfigSchema = zod.object({
    JWT_SECRET: zod.string(),
    JWT_EXPIRES_IN: zod.string(),
});
