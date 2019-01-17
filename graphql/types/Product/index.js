export default `
    type Product {
        title: String!
        price: Float!
        inventory_count: Int!
    }

    type Query {
        product(title: String!): Product
        products(in_stock: Boolean): [Product]
    }
`;