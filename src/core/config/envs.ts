import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').default('3000').asPortNumber(),
	API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
};
