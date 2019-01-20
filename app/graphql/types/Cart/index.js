export default `
    type Purchase {
        product_title: String!
        quantity: Int!
    }

    type Cart {
        purchases: [Purchase]!
        total_price: String!
    }

    type Query {
        cart: Cart
    }

    type Mutation {
        createCart: Cart
        addProduct(title: String!, quantity: Int): Cart
        checkout: Cart
    }
`;