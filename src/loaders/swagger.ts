import path from 'path';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';


export function setupSwagger(app: Express) {
const v1 = path.join(process.cwd(), '.docs', 'swagger-v1.json');
const v2 = path.join(process.cwd(), '.docs', 'swagger-v2.json');
app.use('/docs/v1', swaggerUi.serveFiles(require(v1)), swaggerUi.setup(require(v1), { customSiteTitle: 'API v1 (deprecated)' }));
app.use('/docs/v2', swaggerUi.serveFiles(require(v2)), swaggerUi.setup(require(v2), { customSiteTitle: 'API v2' }));
}