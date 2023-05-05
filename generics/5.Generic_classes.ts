// так дженерики используются в классах
class Resp<D, E> {
    data: D;
    error: E;

    constructor(data: D, error: E) {
        this.data = data;
        this.error = error
    }
}

new Resp<string, number>('data', 0)

// при наследовании класса с дженериком нужно указывать типы данных в дженерике класса родителя
class HTTPResponse<F> extends Resp<string, number> {
    code: F;

    setCode(code: F) {
        this.code = code
    }
}

const resp44 = new HTTPResponse<boolean>('work', 200)
resp44.data