import { mergeTypes } from "merge-graphql-schemas";
import Product from "./Product/";
import Cart from "./Cart/";

const typeDefs = [Product, Cart];

export default mergeTypes(typeDefs, { all: true });