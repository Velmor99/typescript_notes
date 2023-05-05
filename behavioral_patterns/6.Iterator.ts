/*
    Iterator - паттерн который помогает нам проходить одну и ту же структуру 
    данных разными способами.
    Задача: у нас есть приложение которое занимается управлением тасками,
    и у этих тасок есть структура, то есть таска2 может зависеть от таски1,
    у нас есть несколько задач обхода, если нам надо отобразить таски по 
    приоритетности, то нам нужно проитерироваться по таскам по их приоритетности,
    если мы хотим отобразить таски от верхнего уровня к нижнему, то мы должны
    показать сначала таск1 и таск4, а потом таск2 и таск3 так как они подзадачи
    таски1


                                   |---> PriorityIterator
    TaskList <----- Iterator <-----
      |                            |---> DepsIterator
      |
    Task
*/

class Task1 {
    constructor(public priority: number) {}
}

// Это некоторый управляющий элемент, можно добавлять в массив таски к примеру
class TaskList {
    private tasks: Task1[] = [];

    public sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => {
            if(a.priority > b.priority) {
                return 1;
            } else if(a.priority === b.priority) {
                return 0;
            } else {
                return -1
            }
        })
    }

    public addTask(task: Task1) {
        this.tasks.push(task);
    }

    public getTasks() {
        return this.tasks
    }

    public count() {
        return this.tasks.length
    }

    public getIterator() {
        return new PriorityTaskIterator(this);
    }
}

interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;
}

class PriorityTaskIterator implements IIterator<Task1> {

    private position: number = 0;
    private taskList: TaskList;

    constructor(taskList: TaskList) {
        // приоритет
        taskList.sortByPriority()
        this.taskList = taskList;
    }

    current(): Task1 | undefined {
        return this.taskList.getTasks()[this.position]
    }

    next(): Task1 | undefined {
        this.position += 1;
        return this.taskList.getTasks()[this.position]
    }

    prev(): Task1 | undefined {
        this.position -= 1;
        return this.taskList.getTasks()[this.position]
    }

    index(): number {
        return this.position
    }
}

const taskList = new TaskList();
taskList.addTask(new Task1(8))
taskList.addTask(new Task1(1))
taskList.addTask(new Task1(2))
taskList.addTask(new Task1(10))
const iterator = taskList.getIterator();
// теперь благодаря итератору мы можем перемещаться по нашему листу без проблем получая следующий элемент
console.log(iterator.current())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.prev())
console.log(iterator.index())