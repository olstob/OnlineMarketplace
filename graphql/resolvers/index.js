import Product from "../../models/Product";
import { cart } from "../../cart";
import { GraphQLError } from "graphql";

export default {
    Query: {
        product: (root, args) => {
            return new Promise((resolve, reject) => {
                Product.findOne(args).exec((err, product) => {
                    err ? reject(err) : resolve(product);
                });
            });
        },
        products: (root, args) => {
            return new Promise((resolve, reject) => {
                const operator = args.in_stock ? { inventory_count: { $gt: 0 }} : {};
                Product.find(operator).populate().exec((err, products) => {
                    err ? reject(err) : resolve(products);
                });
            });
        },
        cart: () => {
            return cart.toGraphQL();
        }
    },
    Mutation: {
        createCart: () => {
            cart.reset();

            return cart.toGraphQL();
        },
        addProduct: (root, args) => {
            const qtyInCart = cart.getQuantityOfProduct(args.title);
            let qtyToAdd = "quantity" in args ? args.quantity : 1;
            if(qtyToAdd < 1) throw new GraphQLError("The desired quantity needs to be greater than 0");

            let filter = { title: args.title, inventory_count: { $gte: qtyInCart + qtyToAdd } };
            return new Promise((resolve, reject) => {
                Product.findOne(filter).exec((err, product) => {
                    if(err) return reject(err);
                    else if(!product) return reject("Product nonavailable");
                    cart.addItem(product.title, product.price, qtyToAdd);
                    resolve(cart.toGraphQL());
                });
            });
        },
        checkout: () => {
            let promises = [];

            for(let item of cart.items) {
                const filter = { title: item.product, inventory_count: { $gte: item.quantity } };
                const update = { $inc: { inventory_count: -item.quantity }};
                let promise = Product.findOneAndUpdate(filter, update);
                promises.push(promise);
            }

            return new Promise((resolve, reject) => {
                Promise.all(promises)
                .then(() => {
                    resolve(cart.toGraphQL());
                    cart.reset();
                }).catch(err => {
                    reject(err);
                })
            });
        }
    }
}