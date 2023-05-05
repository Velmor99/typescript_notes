abstract class Controller {
    abstract handle(req: any): void

    // мы добавили в абстрактный класс свой метод который реализует какую то логику
    // такого мы не можем сделать с интерфейсами, так как интерфейс описывает только форму
    handleWithLogs(req: any) {
        console.log('Start')
        this.handle(req)
        console.log('End')
    }
}

// мы должны имплементить все АБСТРАКТНЫЕ методы от наследуемого абстрактного класса
class UserController extends Controller {
    handle(req: any): void {
        console.log(req)
    }
    
}

// это абстрактный класс и мы не можем его инсанциировать
// мы можем инстанциировать только те классы которые от него наследуются
new Controller()

const c = new UserController()
c.handleWithLogs('Request')