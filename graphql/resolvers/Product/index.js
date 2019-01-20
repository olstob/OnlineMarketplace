import Product from "../../../models/Product";

export default {
    Query: {
        product: (root, args) => {
            return new Promise((resolve, reject) => {
                args.title = args.title.toLowerCase();
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
        }
    }
}