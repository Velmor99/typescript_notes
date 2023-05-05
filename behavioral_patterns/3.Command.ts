/*
    Мы могли встречать паттерн команда если пользовались какими нибудь state 
    менаджерами, где командами выполняются разные действия
*/

/*
    Задача: у нас есть UserService который сохраняет данные о пользователе,
    есть контроллер который может дергать WebSocket gateway, есть еще модуль
    отдельный который синхронизирует пользователей. Надо сделать возможность 
    отката пользователей, их логгирование, очередь данных или отложенный запуск.
    Комманда представляет из себя отдельный класс, в который у нас подключены 
    все наши сторонние блоки.
*/

// класс пользователя
class User8 {
  constructor(public userId: number) {}
}

// это класс который позволяет нам записывать все что у нас происходит с командой
// используется в классе Command
class CommandHistory {
  public commands: Command[] = [];

  push(command: Command) {
    this.commands.push(command);
  }

  remove(command: Command) {
    this.commands = this.commands.filter(
      (c) => c.commandId !== command.commandId
    );
  }
}

// мы можем сделать команду интерфейсом, а можем сделать отдельным классом если
// хотим заложить туда какую то логику
// Это наша команда которая имеет свою логику
abstract class Command {
    // Присвоение идентификатора команды
  public commandId: number;

  // како бы команда у нас не была, у нас должен быть метод который исполняет
  // эту команду
  abstract execute(): void;

  // использование истории у себя внутри
  constructor(public history: CommandHistory) {
    this.commandId = Math.random();
  }
}

class AddUserCommand extends Command {
  constructor(
    private user: User8,
    private receiver: UserService5,
    history: CommandHistory
  ) {
    super(history);
  }

  execute(): void {
    this.receiver.saveUser(this.user)
    this.history.push(this)
  }

  undo() {
    this.receiver.deleteUser(this.user.userId)
    this.history.remove(this)
  }
}

class UserService5 {
  saveUser(user: User8) {
    console.log("Сохраняю пользователя с id " + user.userId);
  }

  deleteUser(userId: number) {
    console.log("Удаляем пользователя с id " + userId);
  }
}

class Controller5 {
    receiver: UserService5;
    history: CommandHistory = new CommandHistory();

    addReceiver(receiver: UserService5) {
        this.receiver = receiver
    }

    run() {
        // сдесь мы пока просто создали команду со своим payload
        const addUserCommand = new AddUserCommand(
            //payload
            new User8(1),
            //получатель
            this.receiver,
            //доп вещи
            this.history
        );
        //Выполняем
        addUserCommand.execute();
        console.log(addUserCommand.history)
        addUserCommand.undo();
        console.log(addUserCommand.history)
    }
}

/*
    Паттерн широко используется при постороении откатоустойчивой системы
*/

const conttroller = new Controller5();
conttroller.addReceiver(new UserService5())
conttroller.run();
