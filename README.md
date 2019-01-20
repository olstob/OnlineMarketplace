# OnlineMarketplace
This challenge was completed in Javascript ES6, using Node, Express, and GraphQL. The products (in this case candies) are stored on mLab. The data was taken from https://kandju.com/collections/all.

## Usage
Once you've entered the usual commands:
```
npm install
npm start
```
make sure to visit http://localhost:4000/graphql in order to run some queries & mutations using GraphiQL. Some useful keyboard shortcuts are:
- Ctrl+Enter -> Run the query
- Ctrl+Space -> Auto Complete

## Queries & Mutations

Here are the queries that you can use:
```
product(title: String!): Product
products(in_stock: Boolean): [Product]
cart: Cart
```
As you can see, the query `products` has a optional parameter. Passing `in_stock: true` filters the products and returns only those with available inventory. 

Now for the mutations:
```
createCart: Cart
addProduct(title: String!, quantity: Int): Cart
checkout: Cart
```
The parameter `quantity` of the mutation `addProduct` is optional. If a quantity is given, it will add the correct number of products in the shopping cart. Otherwise, it will use the default value of 1.

**Note:** An empty cart is created automatically when the server is started. Because of this, it is not necessary to use `createCart` before adding a product. Additionally, this mutation can be used to discard the shopping cart and get an empty one without reducing the inventory.

## Types

As you saw above, a few custom types were created. 
- Product: Represents a product. Contains the fields title, price and inventory_count.
- Purchase: Represents an entry in the shopping cart. Every purchase has a product_title and a quantity. 
- Cart: Represents a shopping cart. Contains an list of purchases and a total price.

Here they are in detail:
```
type Product {
  title: String!
  price: Float!
  inventory_count: Int!
}

type Purchase {
  product_title: String!
  quantity: Int!
}

type Cart {
  purchases: [Purchase]!
  total_price: String!
}

```
**Note:** The `total_price` field of the type `Cart` is of type String instead of Float. I decided to use String in order to accurately represent currency (ex: 12.30 instead of 12.3). Usually, I would have kept it as a Float and let the frontend format it, but in this case I don't have a frontend.

## Exemples

Returning the product with the title "Mini Red Berries":
```
query {
  product(title: "mini red berries") {
    title
    price
    inventory_count
  }
}
```

Returning all products, showing only the title and inventory_count fields:
```
query {
  products {
    title
    inventory_count
  }
}
```

Returning all products with available inventory, showing only the title and price fields:
```
query {
  products(in_stock: true) {
    title
    price
  }
}
```

Returning the current cart:
```
query {
  cart {
    purchases {
      product_title
      quantity
    }
    total_price
  }
}
```
