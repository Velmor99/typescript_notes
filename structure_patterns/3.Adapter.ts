/*
    Адаптер позволяет адаптировать какаой нибудь неподходящий объект к использованию
    в нашей среде

*/

class KVDatabase {
    private db: Map<string, string> = new Map();
    save(key: string, value: string) {
        this.db.set(key, value)
        console.log({key, value})
    }
}

class PersistentDB {
    savePersistent(data: Object) {
        //
        console.log(data)
    }
}

// мы екстендим тот объект к КОТОРОМУ хотим сделать адаптер
class PersistentDBAdapter extends KVDatabase {
    constructor(public database: PersistentDB) {
        super()
    }

    override save(key: string, value: string): void {
        this.database.savePersistent({key, value})
    }
}

// в случае когда появляется PersistantDb у нас нет удобных методов работы с ним
function run(base: KVDatabase) {
    base.save('key', 'myValue')
}

// Тут функция работает через адаптер с другим классом которые не типа KVDatabase
run(new PersistentDBAdapter(new PersistentDB))

run(new KVDatabase())

