import { SetMetadata } from '@nestjs/common';

export interface ParamConfig {
  [role: string]: {
    required: boolean;
    requiredValue?: string | string[];
    errorMessage?: string;
  };
}

export interface QueryParamConfig {
  paramName: string;
  config: ParamConfig;
}

export function createParamConfig(
  paramName: string,
  config: ParamConfig,
): QueryParamConfig {
  return { paramName, config };
}

export const REQUIRED_QUERY_PARAMS_KEY = 'required_query_params';
export const RequiredQueryParams = (paramsConfig: QueryParamConfig[]) =>
  SetMetadata(REQUIRED_QUERY_PARAMS_KEY, paramsConfig);
