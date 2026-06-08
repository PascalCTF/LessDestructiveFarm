import { Router } from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeSchema } from './graphql-schema';
import { makeClientApiRouter } from './client-api';

const makeApiRouter = async () => {
  const api = Router();

  /*
  api.use(async (req, res, next) => {
    try {
      const authorization = req.header('authorization');
      const token = authorization && authorization.split(' ')[1];
      if (!token) throw new Error();
    } catch (e) {
      next(e);
    }

    next();
  });
  */

  api.use('/', await makeClientApiRouter());

  const schema = await makeSchema();
  api.use(
    '/graphql',
    createHandler({
      schema
    })
  );

  return api;
};

export { makeApiRouter };
