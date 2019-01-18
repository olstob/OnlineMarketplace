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
`;