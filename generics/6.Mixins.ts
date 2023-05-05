// дефолтный конструктор класса, на вход принимает аргументы и возвращает объект
type Constructor = new (...args: any[]) => {}

// наш конструктор класса он принимает определенный тип на вход и возвращает его, мы сужаем его использование
type GConstructor<T = /*можно задать значение по умолчанию*/ {}> = new (...args: any[]) => T

// какой то класс
class List {
    constructor(public items: string[]) { }
}

class Accordion {
    isOpened: boolean;
}

// фактически это конструированный тип от List
type ListType = GConstructor<List>;

type AccordionType = GConstructor<Accordion>

// реализация в виде наследования
class ExtendedListClass extends List {
    first() {
        return this.items[0];
    }
}

/*
    суть миксина в том что мы создаем функцию, требуем что бы 
    в нее передали сам класс и в результате возвращаем класс который
    экстендит переданный класс
    вся соль в том что мы можем одновременно получить extend сразу от
    двух и более классов
*/

// это функция в которую мы должны передать какой то класс, не инстанс класса
// а сам класс, при этом этот класс он должен екстендить ListType
function ExtendedList<TBase extends ListType & AccordionType>(Base: TBase) {
    return class ExtendedList extends Base {
        first() {
            this.isOpened
            return this.items[0]
        }
    }
}

// этот класс нужен для миксования двух классов
class AccordionList {
    isOpened: boolean;
    constructor(public items: string[]) {}
}

// лист это сейчас сам класс, не его инстанс
const list = ExtendedList(AccordionList)

const myList = new list(['first', 'second'])
console.log(myList.first())

