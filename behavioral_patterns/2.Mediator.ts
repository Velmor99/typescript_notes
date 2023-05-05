/*
    Посредник - в основном встречается на фронтенде, нужен для того что бы 
    связать наши компоненты которые не должны знать друг о друге
*/

/*
    Задача: допустим у нас есть EventHandler который принимает всякие события,
    так же у нас есть Notification который отсылает всякие уведомления, 
    есть блок логгирования данных и блок кеширования данных, нужно как то их 
    заставить работать в унисон, для этого нам надо создать Mediator который 
    возьмет на себя роль делегирования этих блоков.
    Если взять пример из фронтенда то медиатором может выступать компонент 
    некой формы которая имеет в себе кнопку, поля, некоторую валидацию 
    и отправляет это все на бекенд
*/

// интерфейс нашего промежуточного медиатора
interface Mediator {
  notify(sender: string, event: string): void;
}

// наш класс медиатор, каждый класс с которым мы будем работать
// должен наследовать Mediated, или implements
abstract class Mediated {
  mediator: Mediator;

  setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }
}

// простейшие классы с которыми мы взаимодействуем
class Notifications {
  send() {
    console.log("Отправляю уведомление");
  }
}

class Log11 {
  log(message: string) {
    console.log(message);
  }
}

// в теории EventHandler мог бы выступить медиатором, но если он принимает так же
// уведомления из других источников это будет не консистентно
class EventHandler extends Mediated {
  // тут мы реализовали отправку события в наш промежуточный медиатор
  myEvent() {
    this.mediator.notify("EventHandler", "myEvent");
  }
}

class NotificationMediator implements Mediator {
  constructor(
    public notifications: Notifications,
    public logger: Log11,
    public handler: EventHandler
  ) {}
  // этот нотифай и будет дергать наш EventHandler
  notify(sender: string, event: string): void {
    switch (event) {
      case "myEvent":
        this.notifications.send();
        this.logger.log("отправлено");
        break;
    }
  }
}

// инициализация
const handler = new EventHandler()
const logger11 = new Log11()
const notifications = new Notifications()

const m = new NotificationMediator(
    notifications,
    logger11,
    handler
)

handler.setMediator(m)
handler.myEvent()
