/*
    В паттерне proxy в отличии от adapter, где мы замещали наш финальный объект делая
    это в виде адаптера, то в прокси мы добавляем дополнительный слой который позволяет
    все равно обращаться к нашему финальному объекту но добавляет еще какую то логику
    Проблема: у нас есть код который работает с API сторонними платежами, как нам 
    управлять доступом к этой API?
*/

interface IPaymentAPI {
    getPaymentDetails(id: number): IPaymentDetail | undefined 
}

interface IPaymentDetail {
    id: number,
    sum: number
}

class PaymentAPI implements IPaymentAPI {
    private data = [{id: 1, sum: 10000}];

    getPaymentDetails(id: number): IPaymentDetail | undefined {
        return this.data.find(d => d.id === id)
    }
}

class PaymentAccessProxy implements IPaymentAPI {
    // в качевстве зависимости мы берем PaymentAPI
    constructor(private api: PaymentAPI, private userId: number) {}
    // сдесь мы проксировали наш исходный вызов метода на вызов api, но при этом добавив логику
    getPaymentDetails(id: number): IPaymentDetail | undefined {
        if(this.userId === 1) {
            return this.api.getPaymentDetails(id)
        }
        console.log('Попытка получить данные платежа!')
        return undefined
    }
}

const proxy = new PaymentAccessProxy(new PaymentAPI(), 1)
console.log(proxy.getPaymentDetails(1))

const proxy2 = new PaymentAccessProxy(new PaymentAPI(), 2)
console.log(proxy2.getPaymentDetails(1))