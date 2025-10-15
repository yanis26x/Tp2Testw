import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import config from 'config';
import { corsMiddleware } from './middleware/cors';
import { baseLimiter } from './middleware/rateLimit';
import { errorHandler, notFound } from './middleware/errors';
import { setupSwagger } from './loaders/swagger';
import v2Routes from './v2/routes';
// ⚠️ Adapte cet import selon ton projet v1
import v1Routes from './v1/index';


const app = express();


app.disable('x-powered-by');
app.set('trust proxy', config.get<boolean>('server.trustProxy'));


app.use(helmet());
app.use(corsMiddleware());
app.use(express.json());
app.use(morgan('dev'));
app.use(baseLimiter);


setupSwagger(app);


const basePath = config.get<string>('app.basePath');
app.use(`${basePath}/v1`, v1Routes); // lecture seule (deprecated dans doc)
app.use(`${basePath}/v2`, v2Routes);


app.use(notFound);
app.use(errorHandler);


export default app;