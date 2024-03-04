import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from './profile.js';
import { prisma } from '../types/prisma.js';
import { PostType } from './post.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (parent, _args, _context) => {
        const profile = await prisma.profile.findUnique({
          where: { userId: parent.id },
        });
        return profile ?? null;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent, _args, _context) => {
        const posts = await prisma.post.findMany({
          where: {
            authorId: parent.id
          }
        });
        return posts;
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent, _args, _context) => {
        const users = await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: parent.id,
              },
            },
          },
        });
        return users;
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent, _args, _context) => {
        const users = await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: parent.id,
              },
            },
          },
        });
        return users;
      },
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});
