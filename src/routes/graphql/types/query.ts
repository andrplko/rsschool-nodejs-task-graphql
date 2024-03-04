import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UserType } from '../queries/user.js';
import { prisma } from './prisma.js';
import { ProfileType } from '../queries/profile.js';
import { PostType } from '../queries/post.js';
import { MemberType, MemberTypeIdEnum } from '../queries/memberType.js';
import { UUIDType } from './uuid.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => await prisma.user.findMany(),
    },
    user: {
			type: UserType,
			args: { id: { type: new GraphQLNonNull(UUIDType) } },
			resolve: async (_, args: { id: string }) => {
        const { id } = args;
        return await prisma.user.findUnique({ where: { id } })
      }
		},
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async () => await prisma.profile.findMany(),
    },
    profile: {
			type: ProfileType,
			args: { id: { type: new GraphQLNonNull(UUIDType) } },
			resolve: async (_, args: { id: string }) => {
        const { id } = args;
        const profile = await prisma.profile.findUnique({ where: { id } });
        return profile ?? null;
      }
		},
    posts: {
      type: new GraphQLList(PostType),
      resolve: async () => await prisma.post.findMany(),
    },
    post: {
			type: PostType,
			args: { id: { type: new GraphQLNonNull(UUIDType) } },
			resolve: async (_, args: { id: string }) => {
        const { id } = args;
        const post = await prisma.post.findUnique({ where: { id } });
        return post ?? null;
      }
		},
    memberTypes: {
			type: new GraphQLList(MemberType),
			resolve: async () => await prisma.memberType.findMany(),
		},
    memberType: {
			type: MemberType,
			args: { id: { type: MemberTypeIdEnum } },
			resolve: async (_, args: { id: string }) => {
        const { id } = args;
        const memberType = await prisma.memberType.findUnique({ where: { id } });
        return memberType ?? null;
      }
		},
  }
});
