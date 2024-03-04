import { GraphQLScalarType } from "graphql"

export const Void = new GraphQLScalarType({
  name: 'Void',
  description: 'Represents null values',
  serialize() {
    return null;
  },
  parseValue() {
    return null;
  },
  parseLiteral() {
    return null;
  }
});
