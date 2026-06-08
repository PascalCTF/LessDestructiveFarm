import * as path from 'path';
import { buildSchema } from 'type-graphql';
import resolvers from '../lib/resolvers';

const makeSchema = async () => {
  return await buildSchema({
    resolvers: resolvers,
    emitSchemaFile: {
      path: path.join(__dirname, '../../schema.gql')
    }
  });
};

export { makeSchema };
