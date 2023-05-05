/*
    Предположим что у нас есть некая форма нашей заявки которая может работать
    с несколькими АПИ, при этом мы понимаем что процесс работы с этими АПИ будет 
    достаточно одинаков. Как раз паттерн шаблонный метод и решает эту задачу,
    он полезен когда у нас есть определенный набор последовательных шагов 
    который в результате приводит к результату, и мы можем эту последовательность 
    шагов сделать в виде некого шаблонного метода.

                          |---> API 1
    form ---> SaveForm ----
                 |        |---> API 2
              abstract
*/

class Form {
    constructor(public name: string) {}
}

// тут реализован template паттерн
abstract class SaveForm<T> {

    // последовательность шагов определена тут
    public save(form: Form) {
        // заполняет форму
        const res = this.fill(form)
        // логирует данные
        this.log(res)
        // отправляет
        this.send(res)
    }

    protected abstract fill(form: Form): T

    protected log(data: T): void {
        console.log(data)
    };
    
    protected abstract send(data: T): void 
}

// так реализован конкретный АПИ, благодаря тому что он отнаследовался
// нам не нужно воспроизводить последовательность шагов
class FirstAPI extends SaveForm<string> {
    protected fill(form: Form): string {
        return form.name
    }
    protected send(data: string): void {
        console.log("Отправляю" + data)
    }
}

// тут уже другое апи и данные отличаются но процесс заполнения и отправки одиннаков
class SecondAPI extends SaveForm<{fio: string}> {
    protected fill(form: Form): {fio: string} {
        return {fio: form.name}
    }
    protected send(data: {fio: string}): void {
        console.log("Отправляю", data)
    }
}

const form1 = new FirstAPI();
form1.save(new Form('Bacya'))
const form2 = new SecondAPI();
form2.save(new Form("Petya"))