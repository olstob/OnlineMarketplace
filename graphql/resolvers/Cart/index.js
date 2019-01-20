import Product from "../../../models/Product";
import { cart } from "../../../cart";
import { GraphQLError } from "graphql";

export default {
    Query: {
        cart: () => {
            return cart;
        }
    },
    Mutation: {
        createCart: () => {
            // Empty the current cart and set the total price to 0
            cart.reset();
            return cart;
        },
        addProduct: (root, args) => {
            // In case the product was already in the cart, with consider the total quantity
            const qtyInCart = cart.getQuantityOfProduct(args.title);
            // 1 being the default value when adding a product
            let qtyToAdd = "quantity" in args ? args.quantity : 1;
            if(qtyToAdd < 1) throw new GraphQLError("The desired quantity needs to be greater than 0");

            let filter = { title: args.title.toLowerCase(), inventory_count: { $gte: qtyInCart + qtyToAdd } };
            return new Promise((resolve, reject) => {
                Product.findOne(filter).exec((err, product) => {
                    if(err) return reject(err);
                    else if(!product) return reject("Product nonavailable");
                    cart.addProduct(product.title, product.price, qtyToAdd);
                    resolve(cart);
                });
            });
        },
        checkout: () => {
            let promises = [];

            for(let purchase of cart.purchases) {
                const filter = { title: purchase.product_title, inventory_count: { $gte: purchase.quantity } };
                const update = { $inc: { inventory_count: -purchase.quantity }};
                let promise = Product.findOneAndUpdate(filter, update);
                promises.push(promise);
            }

            return new Promise((resolve, reject) => {
                Promise.all(promises)
                .then(() => {
                    // Using the stringify and parse methods to deep copy the data before the cart reset
                    resolve(JSON.parse(JSON.stringify(cart)));
                    cart.reset();
                }).catch(err => {
                    // Promise.all will reject if at least 1 promise failed
                    reject(err);
                })
            });
        }
    }
}