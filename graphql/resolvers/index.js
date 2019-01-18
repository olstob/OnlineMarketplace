import Product from "../../models/Product";
import Cart from "../../models/Cart";

export default {
    Query: {
        product: (root, args) => {
            return new Promise((resolve, reject) => {
                Product.findOne(args).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        products: (root, args) => {
            return new Promise((resolve, reject) => {
                const operator = args.in_stock ? { inventory_count: { $gt: 0 }} : {};
                Product.find(operator).populate().exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        cart: () => {
            return new Promise((resolve, reject) => {
                Cart.findOne().exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }
    },
    Mutation: {
        createCart: () => {
            const newCart = new Cart({ items: [], total_price: 0.0});
            return new Promise((resolve, reject) => {
                newCart.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        addProduct: (root, args) => {
            return new Promise((resolve, reject) => {
                let qty = 0;
                if(args.quantity) {
                    qty = args.quantity;
                    args.inventory_count = { $gte: args.quantity};
                    delete args.quantity;
                }

                Product.findOne(args).exec()
                .then(product => {
                    if(!product) return reject("Product nonavailable");
                    console.log("found product:", product);
                    const cost = product.price * qty;

                    return Cart.findOneAndUpdate({}, { $push: { items: { product: product.title, quantity: qty}}, $inc: { total_price: cost}}).exec();
                })
                .then(cart => {
                    if(!cart) return reject("No cart have been found");
                    console.log("found cart:", cart);
                    resolve(cart);
                });
            });
        },
    }
}