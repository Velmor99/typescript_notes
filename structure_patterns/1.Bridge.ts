/*
    Проблема: мы пишем микросервис который будет доставлять уведомления в различные
    мессенджеры, уведомления могут быть различных типов - мгновенные или отложенные
    делаем мы все на классах
*/

// IProvider как через мост будет прокинут в наш компонент
interface IProvider {
    sendMessage(message: string): void;
    connect(config: unknown): void;
    disconnect(): void;
}

class TelegramProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message)
    }
    connect(config: string): void {
        console.log(config)
    }
    disconnect(): void {
        console.log('Disconnected TG')
    }
}

class WhatsUpProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message)
    }
    connect(config: string): void {
        console.log(config)
    }
    disconnect(): void {
        console.log('Disconnected WU')
    }
}

class NotificationSender {
    constructor(private provider: IProvider) {}

    send() {
        this.provider.connect('connect');
        this.provider.sendMessage('message')
        this.provider.disconnect()
    }
}

class DelayNotificationSender extends NotificationSender {
    constructor(provider: IProvider) {
        super(provider)
    }

    sendDelayed() {
        
    }
}

const sender = new NotificationSender(new TelegramProvider())
sender.send()
const sender2 = new DelayNotificationSender(new WhatsUpProvider())
sender2.sendDelayed()