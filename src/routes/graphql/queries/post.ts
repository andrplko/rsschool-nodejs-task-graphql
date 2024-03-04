import {
  GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const PostType = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
		content: { type: new GraphQLNonNull(GraphQLString) },
		title: { type: new GraphQLNonNull(GraphQLString) },
		authorId: { type: new GraphQLNonNull(UUIDType) },
	}),
});

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
		title: { type: new GraphQLNonNull(GraphQLString) },
		authorId: { type: new GraphQLNonNull(UUIDType) },
  }
});

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    content: { type: GraphQLString },
		title: { type: GraphQLString },
  }
});
