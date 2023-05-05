/*
    Observer - по сути это модель event listening когда у нас есть подписчики
    события, есть кто то кто эмитит эти события.
    Задача: у нас есть новый лид. который собирает заявки с сайта, 
    для того что бы он работал у нас есть LeadService который его создает,
    и какой нибудь NotificationService который отправляет смски.
    Проблема в том что нам придется каждый раз опрашивать наш лид а есть ли 
    новые заявки, легче будет на него подписаться
*/

interface Observer {
    // этот метод мы дергаем когда у нас произошло какое то событие
    update(subject: Subject): void;
}

interface Subject {
    // подписка
    attach(observer: Observer): void
    // отписка
    detach(observer: Observer): void
    // какой то внешний наш код будет дергать этот метод и просить оповестить его о изменениях
    notify(): void
}

class Lead {
    constructor(public name: string, public phone: string) {}
}

class NewLead implements Subject {
    // это те кто подписались
    private observers: Observer[] = [];
    public state: Lead;

    attach(observer: Observer): void {
        if(this.observers.includes(observer)) {
            return;
        }
        this.observers.push(observer)
    }
    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer)
        if(observerIndex === -1) {
            return;
        }
        this.observers.splice(observerIndex, 1)
    }
    notify(): void {
        for(const observer of this.observers) {
            // передав this мы передадим как state так и сам subject
            observer.update(this);
        }
    }
}

// подписчики
class NotificationService implements Observer {
    update(subject: Subject): void {
        console.log("NotificationService получил уведомление")
        console.log(subject)
    }
    
}

class LeadService implements Observer {
    update(subject: Subject): void {
        console.log("LeadService получил уведомление")
        console.log(subject)
    }
}

const subject = new NewLead();
subject.state = new Lead("Roma", '000000')
const s1 = new NotificationService()
const s2 = new LeadService()

subject.attach(s1);
subject.attach(s2)
subject.notify();
subject.detach(s1);
subject.notify();