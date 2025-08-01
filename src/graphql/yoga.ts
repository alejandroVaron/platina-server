import { createSchema } from "graphql-yoga";
import { typeDefs } from "@graphql/schema";
import { resolvers } from "@graphql/resolvers";

export const schema = createSchema({
  typeDefs,
  resolvers,
});
