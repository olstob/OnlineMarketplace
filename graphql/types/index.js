import { mergeTypes } from "merge-graphql-schemas";
import Product from "./Product/";

const typeDefs = [Product];

export default mergeTypes(typeDefs, { all: true });