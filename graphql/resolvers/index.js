import Product from "../../models/Product";

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
        }
    }
}