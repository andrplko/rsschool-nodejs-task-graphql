import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { ChangePostInput, CreatePostInput, PostType } from "../queries/post.js";
import { ChangeProfileInput, CreateProfileInput, ProfileType } from "../queries/profile.js";
import { ChangeUserInput, CreateUserInput, UserType } from "../queries/user.js";
import { prisma } from "./prisma.js";
import { UUIDType } from "./uuid.js";
import { Void } from "./void.js";

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInput } },
      resolve: async (_, args: { dto }) => {
        return prisma.user.create({
          data: args.dto,
        });
      }
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInput } },
      resolve: async (_, args: { dto }) => {
        return prisma.profile.create({
          data: args.dto,
        });
      }
    },
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInput } },
      resolve: async (_, args: { dto }) => {
        return prisma.post.create({
          data: args.dto,
        });
      }
    },
    deleteUser: {
      type: Void,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }) => {
        await prisma.user.delete({
          where: {
            id: args.id
          },
        });
      }
    },
    deleteProfile: {
      type: Void,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }) => {
        await prisma.profile.delete({
          where: {
            id: args.id
          },
        });
      }
    },
    deletePost: {
      type: Void,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }) => {
        await prisma.post.delete({
          where: {
            id: args.id
          },
        });
      }
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) }
      },
      resolve: async (_, args: { id: string, dto }) => {
        return prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) }
      },
      resolve: async (_, args: { id: string, dto }) => {
        return prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) }
      },
      resolve: async (_, args: { id: string, dto }) => {
        return prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args: { userId: string, authorId: string }) => {
        return prisma.user.update({
          where: {
            id: args.userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });
      }
    },
    unsubscribeFrom: {
      type: Void,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args: { userId: string, authorId: string }) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
      }
    }
  }
});
