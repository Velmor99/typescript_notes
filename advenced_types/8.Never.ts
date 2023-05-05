/*
    Never позволяет более эффективно писать наш код и делает его более безопасным

*/

//case 
type paymentAction = 'refund' | 'checkout'; // если добавим еще тип то получим ошибку в processAction

function processAction(action: paymentAction) {
    switch(action) {
        case 'checkout':
            // ...
        break;

        case 'refund':
            //...
        break;
        default:
            // Это нужно что бы при добавлении нового типа в paymentAction наш компилятор нам подсказал не забыть добавить для него кейс
            const protect: never = action
    }
}

// case исчерпывающая проверка
// эта функция никогда не вернется, поэтому тут корректнее указать never чем void
function generateError(message: string): never {
    throw new Error(message)
}

function isString1(x: string | number): boolean {
    if(typeof x === 'string') {
        return true;
    } else if (typeof x === 'number') {
        return false
    }
    // тут мы можем попасть в ситуацию что вернется undefined так как нет
    // заключительного блока else, однако с помощью never можно решить эту проблему
    // мы говорим в нашем коде что сюда мы никогда не попадем, но если вдруг у нас 
    // в переменной х лежит не строка и не число то мы спокойно свалимся в ошибку
    generateError('Unknown type')
}