import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { Query } from './types/query.js';
import { prisma } from './types/prisma.js';
import { Mutation } from './types/mutation.js';

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, _reply) {
      const { query, variables } = req.body;

      const validateErrors = validate(schema, parse(query), [
        depthLimit(5),
      ]);

      if (validateErrors.length) {
        return {
          data: null,
          errors: validateErrors
        }
      }

      const { data, errors } = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: prisma,
      });

      return {
        data,
        errors
      }
    },
  });
};

export default plugin;
