/*
    Задача будет на примере страхового сервиса.
    Допустим мы реализовываем какой то страховой сервис
    который работает со страховой компанией.
    Пользователь отсылает нам данные, мы их у себя 
    как то изменяем и передаем в страховую.
    Задача Фабрики в данном случае сделать так что бы
    если будут добавляться страховые компании,
    нам не надо было каждый раз поправлять код в разных
    местах добавляя условия и изменяя логику
*/

// Это интерфейс общей страховки, любая страховка попавшая
// к нам в систему должна реализовывать этот интерфейс
interface IInsurance {
    id: number;
    status: string;
    setVehicle(vehicle: any): void;
    submit(): Promise<boolean>;
}

// класс одной из компаний которая пользуется нашими услугами
class TFInsurance implements IInsurance {
    id: number;
    status: string;
    private vehicle: any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    async submit(): Promise<boolean> {
        const res = await fetch('https://TFInsurance', {
            method: "POST", 
            body: JSON.stringify({vehicle: this.vehicle})
        })
        const data = await res.json();
        return data.isSuccess;
    }
    
}

// это класс уже другой компании, у нее схожий интерфейс, но посылает данные она в другое место
// ответ приходит другого формата и тут могут быть свои методы
class ABInsurance implements IInsurance {
    id: number;
    status: string;
    private vehicle: any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    async submit(): Promise<boolean> {
        const res = await fetch('https://ABInsurance', {
            method: "POST", 
            body: JSON.stringify({vehicle: this.vehicle})
        })
        const data = await res.json();
        return data.yes;
    }
    
}

// Это абстрактная фабрика которая имеет методы которые будут
// полезны всем фабрикам с которыми мы будем работать
// Дополнительная абстракция нужна как раз ради общих методов!
abstract class InsuranceFactory {
    db: any;
    abstract createInsurance(): IInsurance;

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

// Таким образом мы получили готовую фабрику
class TFInsuranceFactory extends InsuranceFactory {
    createInsurance(): TFInsurance {
        return new TFInsurance();
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
        return new ABInsurance();
    }
}

// Таким образом в нашей системе когда мы будем писать код
// мы получаем один раз конкретную фабрику конкретной реализации
// и затем можем использовать все методы доступные абстрактные
// и работать с созданной insurance как с IInsurance
// и весь наш код который находится вне конкретного создания
// должен полагаться именно на IInsurance
// но так же могут быть кусочки кода, например в конкретном модуле
// который работает с конкретной страховкой, который полагается
// именно на TFInsurance
const tfInsuranceFactory = new TFInsuranceFactory();
const ins = tfInsuranceFactory.createInsurance();
tfInsuranceFactory.saveHistory(ins);



//------------------------------------------------------------------------------//



// Альтернативная реализация на typescript чуть более компактный
// тут не нужна фабрика на каждый тип, мы можем их заменить мапой типов
const INSURANCE_TYPE = {
    tf: TFInsurance,
    ab: ABInsurance
}

type InsType = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
    db: any;

    // с точки зрения дженерика мы берем какой то тип
    // который экстендит ключи InsType, передаем такой в качестве параметра
    // и возвращаем этот тип
    createInsurance<T extends keyof InsType>(type: T): InsType[T] {
        return INSURANCE_TYPE[type];
    }

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

const insuranceFactoryAlt = new InsuranceFactoryAlt();
const ins2 = new (insuranceFactoryAlt.createInsurance('tf'))