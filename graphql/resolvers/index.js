import { mergeResolvers } from "merge-graphql-schemas";

import Product from "./Product/";
import Cart from "./Cart/";

const resolvers = [Product, Cart];

export default mergeResolvers(resolvers);