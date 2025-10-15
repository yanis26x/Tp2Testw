import app from './app';
import { connectDB } from './loaders/db';
import config from 'config';

async function bootstrap() {
  await connectDB();
  const http = config.get<any>('server.http');
  if (http.enabled) {
    const port = http.port || 2626;
    app.listen(port, () => console.log(`[HTTP] Listening on :${port}`));
  }
}

bootstrap();
