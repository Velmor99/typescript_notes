/*
    Необходимо сделать корзину (cart) на сайте,
    которая имеет список продуктов (Products), добавляемых в корзину
    и параметры доставки (Delivery). Для Cart реализовать методы:
    - Добавить продукт в корзину
    - Удалить продукт из корзины по ID
    - Посчитать стоимость товаров в корзине
    - Задать доставку
    - Checkout - вернуть что все ок, если есть продукты и параметры доставки
    Product: id, название и цена
    Delivery: может быть как до дома (дата и адрес) или до пункта выдачи (дата = Сегодя и Id магазина)
*/

// interface IProduct {
//     id: number,
//     name: string,
//     price: number,
// }

// enum TypeDelivery {
//     'HOME',
//     'SHOP'
// }

// interface IShopDelivery {
//     type: TypeDelivery.SHOP
//     shopId: number
//     date: Date
// }

// interface IHomeDelivery {
//     type: TypeDelivery.HOME
//     adress: string
//     date: Date
// }

// type Delivery = IHomeDelivery | IShopDelivery

// class Cart {
//     private products: IProduct[];
//     private delivery: any;

//     constructor() {
//         this.delivery = null;
//         this.products = []
//     }

//     addProductToCart(product: IProduct): void {
//         this.products.push(product)
//     }

//     removeProductFromCart(product: IProduct): void {
//         this.products = this.products.filter(item => item.id !== product.id)
//     }

//     calculateTotalPrice(): number {
//         return this.products.reduce((acc, item) => acc + item.price, 0)
//     }

//     createDelivery(delivery: Delivery) {
//         if(delivery.type === TypeDelivery.HOME) {
//             this.delivery = delivery
//         } else {
//             delivery.date = new Date()
//             this.delivery = delivery
//         }
//     }

//     checkout() {
//         if(this.products.length === 0) {
//             console.log("Нечего доставлять")
//         } else if(!this.delivery) {
//             console.log('не выбрано место доставки')
//         } else {
//             console.log('Доставка оформлена ожидайте заказа')
//         }
//     }

//     get _products() {
//         return this.products
//     }
// }

// const myCart = new Cart()
// myCart.addProductToCart({id: 1, price: 15, name: 'microphone'})
// myCart.addProductToCart({id: 2, price: 20, name: 'water heater'})
// myCart.removeProductFromCart({id: 2, price: 20, name: 'water heater'})
// console.log(myCart.calculateTotalPrice())
// console.log(myCart._products)
// myCart.checkout()
// myCart.createDelivery({type: TypeDelivery.HOME, date: new Date(), adress: 'pushkina'})
// myCart.checkout()

/////realization


class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
    ) { }
}

class Delivery {
    constructor(
        public date: Date
    ) { }
}

class HomeDelivery extends Delivery {
    constructor(date: Date, public adress: string) {
        super(date)
    }
}

class ShopDelivery extends Delivery {
    constructor(date: Date, public shopId: number) {
        super(date)
    }
}

type DeliveryOptions = ShopDelivery | HomeDelivery

class Cart {
    private products: Product[] = [];
    private delivery: HomeDelivery | ShopDelivery

    public addProduct(product: Product): void {
        this.products.push(product)
    }

    public deleteProduct(productId: number): void {
        this.products = this.products.filter((p: Product) => p.id !== productId)
    }

    public getSum(): number {
        return this.products
        .map((p: Product) => p.price)
        .reduce((p1: number, p2: number) => p1 + p2)
    }

    public setDelivery(delivery: DeliveryOptions): void {
        this.delivery = delivery
    }

    public checkout() {
        if(this.products.length === 0) {
            throw new Error('Нет ни одного товара в корзине')
        }
        if(!this.delivery) {
            throw new Error("Не указан способ доставки")
        }
        return {success: true}
    }
}

const cart = new Cart();
cart.addProduct(new Product(1, 'Печенье', 10))
cart.addProduct(new Product(2, 'Торт', 30))
cart.addProduct(new Product(3, 'Шоколад', 20))
cart.deleteProduct(1)
cart.setDelivery(new HomeDelivery(new Date(), ''));
console.log(cart.getSum());
console.log(cart.checkout())