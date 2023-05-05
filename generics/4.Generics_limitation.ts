/*interface or*/ class Auto {
    run: number
}

// Т обязательно какой то класс или объект который 
// в результате наследует Auto 
// таким образом мы можем давать ограничения дженерикам которые
// мы даем функциям и методам
function kmToMiles<T extends Auto>(vehicle: T): T {
    vehicle.run = vehicle.run / 0.62;
    return vehicle;
}

/*interface or*/ class LCV extends Auto {
    capacity: number
}

const vehicle2 = kmToMiles(new Auto())
const lcv = kmToMiles(new LCV())

// ошибка
kmToMiles({a: 1})

// не обязательно что бы передавался инстанс, достаточно передать
// точно такой же объект
kmToMiles({run: 12})

// легко можно наследоваться и от примитивов, так же перечислять дженерики через запятую для разных аргументов
function logId<T extends string | number, Y>(id: T, additionalData: Y): {id: T, data: Y} {
    console.log(id)
    console.log(additionalData)
    return {id: id, data: additionalData}
}
