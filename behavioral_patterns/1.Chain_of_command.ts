/*
    Поведенеские паттерны решают задачу эффективного взаимодействия между компонентами
    нашей системы, если взаимодействие будет не эффективным то мы будем натыкаться на проблему
    масштабирования, добавления новых элементов. Эти паттерны как раз решают такую проблему
    что бы наше приложение было расширяемым
*/

/*
    Задача: у нас есть АПИ, когда приходит HTTP запрос мы должны вызвать какой то обработчик
    который дальше имеет бизнес логику, нам нужно добавить промежуточный блок например авторизации
    и впринципе сделать наш АПИ расширямым для таких промехуточных блоков.
*/

interface IMiddleware {
    next(mid: IMiddleware): IMiddleware;
    handle(request: any): any;
}

// класс абстрактный потому что мы хотим тут реализовать только часть какой либо функциональности
abstract class AbstractMiddleware implements IMiddleware {
    private nextMiddleware: IMiddleware;

    // в реальных middlewares мы будем переопределять метод handle
    handle(request: any) {
        if(this.nextMiddleware) {
            return this.nextMiddleware.handle(request)
        }
    }

    // next нужен что бы добавлять класс в цепочку
    next(mid: IMiddleware): IMiddleware {
        this.nextMiddleware  = mid;
        return mid;
    }
}

class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('AuthMiddleware')
        if(request.userId === 1) {
            return super.handle(request)
        }
        return {error: 'Вы не авторизованы'}
    }
}

// мы разделили ответственность между классами
class ValidateMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('ValidateMiddleware')
        if(request.body) {
            return super.handle(request)
        }
        return {error: 'Нет body'}
    }
}

class Controller2 extends AbstractMiddleware {
    override handle(request: any) {
        console.log('Controller')
        return {success: request}
    }
}

const controller2 = new Controller2();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();

auth.next(validate).next(controller2);

console.log(auth.handle({
    userId: 4
}))

console.log(auth.handle({
    userId: 1
}))