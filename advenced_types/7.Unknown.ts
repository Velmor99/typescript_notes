/*
    Unknown тип нужен для обозначения переменной, тип которой мы пока не знаем,
    но этот тип не any
    Unknown более строгий чем any и он требует определения типа перед присвоением
    Нужна проверка на тип
*/

//case 

async function getData() {
    try {
        fetch('/...')
    // error в данном случае является unknown, так как ошибка может быть кастомной
    } catch (error) {
        // тут мы приводим тип error к классу Error
        if(error instanceof Error) {
            // и только после этого мы получаем доступ к свойству message
            console.log(error.message)
        }
    }
}