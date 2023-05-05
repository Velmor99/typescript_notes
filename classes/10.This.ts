// наглядная цепочка потери контекста
// 1) мы создали класс с одним свойством и методотом который возвращает 
// это свойство в контексте этого класса
class Payment2 {
    private date: Date = new Date()

    // что бы typescript понимал что контекст утерян
    // мы должны кинуть параметром this типа того класса
    // где он и объявлен
    // (Это исключительно в typescript)
    getDate(this: Payment2) {
        return this.date
    }

    // в случае стрелочной функции мы не будем терять контекст
    getDateArrow = () => {
        return this.date
    }
}

// создаем интанс класса
const p = new Payment2()
// создаем объект с методом paymentDate, который берет метод 
// из инстанса нашего класса, теперь this ссылается на user3
// а у user3 нет метода date
const user3 = {
    id: 1,
    // что бы все работало как надо, мы должны прокинуть контекст 
    // paymentDate: p.getDate.bind(p)
    paymentDate: p.getDate,

    paymentDateArrow: p.getDateArrow
}

console.log(p.getDate())
// поэтому тут мы получим undefined
console.log(user3.paymentDate())
console.log(user3.paymentDateArrow())


// пример когда стрелочная функция не является решением проблемы контекста
class PaymentPersistent extends Payment2 {
    save() {
        // все будет работать если мы напишем 
        // return this.getDateArrow()
        return super.getDateArrow()
    }
}
// будет ошибка так как в прототипе объекта Payment2 нет функции getDateArrow
// изза того что в исходном прототипе мы не можем технически получить стрелочную функцию

console.log(new PaymentPersistent().save())