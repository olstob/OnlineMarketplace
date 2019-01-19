class Cart {

    constructor() {
        this.reset = () => {
            this.purchases = [];
            this.total_price = 0;
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
        const cost = quantity * price;
        this.total_price += cost;
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