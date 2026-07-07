import cors from 'cors';
import express from 'express';
import next from 'next';
import { makeApiRouter } from './api';
import * as Log from './lib/log';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

export const initWebServer = async (error?: any) => {
  const server = express();

  if (error) {
    server.use((req, res) => {
      res.end(error.toString());
    });
  } else {
    Log.wait('Loading Next.JS');
    await app.prepare(); // Await for nextjs init
    Log.ready('Next.JS Ready');

    server.use(cors());

    if (process.env.BASIC_AUTH) {
      server.use((req, res, next) => {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
        const [expectedLogin, expectedPassword] = (process.env.BASIC_AUTH as string).split(':');

        if (login === expectedLogin && password === expectedPassword) {
          return next();
        }

        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Authentication required.');
      });
    }

    server.use('/api', await makeApiRouter());
    server.use(async (err: any, req: any, res: any, next: any) => {
      if (err) {
        res.status(500).end(err);
      }
    });

    server.use('/public', express.static('./public'));

    //TODO check if this is safe for production
    server.get('/{*splat}', (req, res) => {
      return handle(req, res);
    });
  }

  server.listen(3000);
  Log.ready('> Server ready on http://localhost:3000');
};
