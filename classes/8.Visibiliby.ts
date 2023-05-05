class Vehicle {
    public make: string;
    private damages: string[]
    private model: string;
    protected run: number;
    // так помечаются приватные свойства в js
    #price: number;

    public addDamage(damage: string) {
        this.damages.push(damage)
    }

    set _model(m: string) {
        this.model = m
    }

    get _model() {
        this.run
        return this.model
    }

    // тут мы можем получить приватное свойство v потому что мы можем проверить эквивалентность двух свойств
    isPriceEqual(v: Vehicle) {
        return this.#price === v.#price
    }
}

class EuroTruck extends Vehicle {
    // конструктор может быть приватным что бы его нельзя было вызвать в другом месте
    private constructor() {
        super()
    }


    setDamage() {
        // только публичные свойства
    }

    setRun(km: number) {
        this.run = km / 0.62 
    }
}

new Vehicle()._model
new Vehicle()