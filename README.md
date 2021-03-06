# OnlineMarketplace
This challenge was completed in Javascript ES6, using Node, Express, and GraphQL. The products (in this case candies) are stored on mLab. The data was taken from https://kandju.com/collections/all.

## Usage

### Locally
The server needs the DB_URL key set in a config file.
To do this, create a file called local.json and place it in the folder config/.
The file should look like this:
```
{
    "DB_URL": "mongodb://<DB_USER>:<DB_PASSWORD>@ds161764.mlab.com:61764/db_s2019_challenge"
}
```

Then you can run the usual commands:
```
npm install
npm start
```

Once all of this is done, visit http://localhost:8000/graphql in order to run some queries & mutations using GraphiQL. 

### On Heroku
The app is deployed on Heroku at the address https://olstob-s2019-shopify.herokuapp.com/graphql.
I use a free dyno, meaning that the app goes to sleep after 30 minutes of inactivity. Because of this, the first request can be slow. 

### GraphiQL
Some useful keyboard shortcuts are:
- Ctrl+Enter -> Run the query
- Ctrl+Space -> Auto Complete

## Queries & Mutations

Here are the queries that you can use:
```
product(title: String!): Product          # Fetch a specific product
products(in_stock: Boolean): [Product]    # Fetch all products, or only those with available inventory
cart: Cart                                # Fetch the current shopping cart
```
As you can see, the query `products` has a optional parameter. Passing `in_stock: true` filters the products and returns only those with available inventory. 

Now for the mutations:
```
createCart: Cart                                    # Create a new, empty shopping cart
addProduct(title: String!, quantity: Int): Cart     # Add a product to the shopping cart
checkout: Cart                                      # Reduce the inventory of all the products in the cart, 
                                                    # returns this cart and create a new one.
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

## Examples

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

Create a new shopping cart:
```
mutation {
  createCart {
    purchases {
      product_title
      quantity
    }
    total_price
  }
}
```

Add the product "licorice" to the cart:
```
mutation {
  addProduct(title: "licorice") {
    purchases {
      product_title
      quantity
    }
    total_price
  }
}
```

Add three products "licorice" to the cart:
```
mutation {
  addProduct(title: "licorice", quantity: 3) {
    purchases {
      product_title
      quantity
    }
    total_price
  }
}
```

Checkout the current cart:
```
mutation {
  checkout {
     purchases{
      product_title
      quantity
    }
    total_price
  }
}
```
