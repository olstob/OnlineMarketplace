import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const CartSchema = new Schema({
    items: {
        type: [ItemSchema],
        required: true,
        unique: true
    },
    total_price: {
        type: Number,
        required: true
    }
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;