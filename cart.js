class Cart {

    constructor() {
        this.reset = () => {
            this.purchases = [];
            this.total_price = "0.00";
        };
        this.reset();
    }

    addProduct(title, price, quantity) {
        if(quantity < 1) return;
        const existingPurchase = this.findPurchase(title);

        if(existingPurchase) {
            existingPurchase.quantity += quantity;
        } else {
            const newPurchase = {"product_title": title, "quantity": quantity};
            this.purchases.push(newPurchase);
        }

        // New total as a float
        const total_price_float = parseFloat(this.total_price) + quantity * price;
        // Rounding to two decimals
        const rounded_price = Math.round(total_price_float * 100) / 100;
        // Adding zeros at the end if necessary
        this.total_price = rounded_price.toFixed(2);
    }

    getQuantityOfProduct(productTitle) {
        const purchase = this.findPurchase(productTitle);
        return purchase ? purchase.quantity : 0;
    }

    findPurchase(productTitle) {
        return this.purchases.find((purchase) => {
            return purchase.product_title === productTitle;
        });
    }

}

export let cart = new Cart();