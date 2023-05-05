/*
    Задача: представим что у нас есть магазин который доставляет товары от нескольких поставщиков
    клиент набирает товары и хочет понять какова суммарная стоимость заказа, есть магазин который 
    берет какую то комиссию за доставку, в этом магазине есть свои упаковки в которых лежат свои 
    товары, а может быть без упаковки, а может быть упаковка в упаковке (древлвидная структура)
    Решение: можно сделать некий абстрактный класс DeliveryItem в нем есть набор items, товаров
    у каждого товара есть метод getPrice который возвращает стоимость этого товара
*/

abstract class DeliveryItem {
  items: DeliveryItem[] = [];

  addItem(item: DeliveryItem) {
    this.items.push(item);
  }

  removeItem() {
    //...
  }

  getItemPrices(): number {
    return this.items.reduce(
      (acc: number, item: DeliveryItem) => (acc += item.getPrice()),
      0
    );
  }

  abstract getPrice(): number;
}

class DeliveryShop extends DeliveryItem {
  constructor(private deliveryFee: number) {
    super();
  }

  getPrice(): number {
    return this.getItemPrices() + this.deliveryFee;
  }
}

class Package extends DeliveryItem {
  getPrice(): number {
    return this.getItemPrices();
  }
}

class Good extends DeliveryItem {
  constructor(public price: number) {
    super();
  }

  getPrice(): number {
    return this.price;
  }
}

const shop = new DeliveryShop(100);
shop.addItem(new Good(1000));

const pack1 = new Package()
pack1.addItem(new Good(200))
pack1.addItem(new Good(300))
shop.addItem(pack1)

const pack2 = new Package()
pack2.addItem(new Good(30))
shop.addItem(pack2)

console.log(shop.getPrice())


