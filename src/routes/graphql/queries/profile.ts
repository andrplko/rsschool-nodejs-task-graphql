import {
	GraphQLNonNull,
	GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeIdEnum } from './memberType.js';
import { prisma } from '../types/prisma.js';

export const ProfileType = new GraphQLObjectType({
	name: 'Profile',
	fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: MemberTypeIdEnum },
    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeIdEnum } },
      resolve: async (parent) => {
        const { memberTypeId } = parent;
        if (!memberTypeId) {
          return null;
        }
        const memberType = await prisma.memberType.findUnique({
          where: { id: memberTypeId },
        });
        return memberType ?? null;
      }
    }
	}),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: MemberTypeIdEnum },
  }
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  }
});
