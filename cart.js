class Cart {

    constructor() {
        this.reset = () => {
            this.items = [];
            this.total_price = 0;
        };
        this.reset();
    }

    addItem(title, price, quantity) {
        const product = this.findProduct(title);

        if(product) {
            product.quantity += quantity;
        } else {
            const item = {"product": title, "quantity": quantity};
            this.items.push(item);
        }
        const cost = quantity * price;
        this.total_price += cost;
    }

    getQuantityOfProduct(title) {
        const product = this.findProduct(title);
        return product ? product.quantity : 0;
    }

    findProduct(title) {
        return this.items.find((item) => {
            return item.product === title;
        });
    }

    toGraphQL() {
        return {"items": this.items, "total_price": this.total_price};
    }
}

export let cart = new Cart();