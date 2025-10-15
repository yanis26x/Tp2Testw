import cors from 'cors';
import config from 'config';


export function corsMiddleware() {
const origins = config.get<string[]>('security.cors.origins');
return cors({ origin: origins, credentials: true });
}