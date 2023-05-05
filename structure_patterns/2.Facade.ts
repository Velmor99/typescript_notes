/*
    Фассад - это паттерн который позволяет скрыть всю внутреннюю реализацию за простым API
    Проблема: нам надо отправить уведомление, у нас есть класс который занимается уведомлениями,
    есть класс который занимается логами, есть класс который делает например email шаблоны.
    Мы должны сделать класс NotificationFacade который из себя представляет некий API для внешнего пользователя
    а в результате под фасадом работает сложная логика
*/

class Notify {
    send(template: string, to: string) {
        console.log("Отправляю template кому то")
    }
}

class Logging {
    log(message: string) {
        console.log(message)
    }
}

class TemplateCreator {
    private templates = [
        {name: 'other', template: '<h1>Template</h1>'}
    ]

    getByName(name: string) {
        return this.templates.find(t => t.name === name);
    }
}

class NotificationFacade {
    // пользователь не должен знать об этих свойствах
    private notify: Notify;
    private log: Logging;
    private template: TemplateCreator;

    constructor() {
        this.notify = new Notify()
        this.log = new Logging()
        this.template = new TemplateCreator()
    }

    // Тут реализуется вся сложная логика которую реализуют отдельные классы
    // все что нам надо это входные данные и метод send
    send(to: string, templateName: string) {
        const dataTemplate = this.template.getByName(templateName)
        if(!dataTemplate) {
            this.log.log("Не найден шаблон")
            return
        } 
        this.notify.send(dataTemplate.template, to)
        this.log.log("Шаблон отправлен")
    }
}

const s = new NotificationFacade();
s.send('wince@gmail.com', 'other')