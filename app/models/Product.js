import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    inventory_count: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;