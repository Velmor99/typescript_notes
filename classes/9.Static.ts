class UserService {
    static db: any;

    static getUser(id: number) {
        return this.db.findById(id)
    }

    create() {
        this.create()
        UserService.db
    }

    // constructor(id: number) {}

    // Этот статичный блок выполнится при псевдоинициализации и в нем не может быть асинхронных методов
    static {
        UserService.db = 'sldf'
    }
}

//статичные свойства не требуют создания инстанса для того что бы к ним обращаться
UserService.db
UserService.getUser(2)
// При инстанциировании мы теряем доступ ко всем статичным свойствам
const inst = new UserService().create()