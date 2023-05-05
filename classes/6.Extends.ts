type WalletStatus = "new" | "paid";

class Wallet {
  id: number;
  status: WalletStatus = "new";

  constructor(id: number) {
    this.id = id;
  }

  pay() {
    this.status = "paid";
  }
}

// Наследование классов

class PersistedWallet extends Wallet {
  databaseId: number;
  paidAt: Date;

  constructor() {
    const id = Math.random();
    super(id);
  }

  save() {
    // Сохраняет в базу
  }

  // Нужно что бы метод удовлетворял метод из наследуемого класса
  // То есть расширял его, поэтому мы делаем его не обязательным
  // override говорит о том что мы переопределили метод, этакий флажок
  override pay(date?: Date): void {
    super.pay()
    if (date) {
      this.paidAt = date;
    }
  }
}

new PersistedWallet().id;


// последовательность вызова конструкторов, сначала super а потом this
class Employe {
    name: string = 'user';

    constructor() {
        console.log(this.name);
    }
}

class Leader extends Employe {
    name: string = 'leader'

    constructor() {
        super()
        console.log(this.name)
    }
}

new Leader()

class HttpError extends Error {
    code: number;

    constructor(message: string, code?: number) {
        super(message);
        this.code = code ?? 500
    }
}