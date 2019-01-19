export default `
    type Item {
        product: String!
        quantity: Int!
    }

    type Cart {
        items: [Item]!
        total_price: Float!
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