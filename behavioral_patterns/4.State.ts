/*
    Задача: мы публикуем статью в блог, статья имеет три стадии - черновик,
    на модерации и опубликовано, мы можем снять статью с публикации 
    переместив ее в черновики, и можем снять статью с модерации опять таки
    в черновики.
    Вместо того что бы хранить состояние и всю нашу бизнесс логику внутри 
    документа, мы говорим что у документа есть ссылка на его текущее состояние
    которое является надклассом DocState (abstract), и вся бизнес логика которая
    связана с переходом между состояниями публикации, например логирование, 
    мы можем реализовывать внутри наших этапов.
*/

class DocumentItem {
    public text: string;
    private state: DocumentItemState;

    constructor() {
        this.setState(new DraftDocumentItemState())
    }

    // получить состояние
    getState() {
        return this.state
    }

    // установить состояние
    setState(state: DocumentItemState) {
        this.state = state
        this.state.setContext(this)
    }

    // опубликовать
    publishDoc() {
        this.state.publish()
    }

    // перенести с публикации назад в черновики
    deleteDoc() {
        this.state.delete()
    }
}

// Это то самое состояние которое хранят наши draft и published документы
abstract class DocumentItemState {
    public name: string;
    public item: DocumentItem;

    public setContext(item: DocumentItem) {
        this.item = item
    }

    public abstract publish(): void;
    public abstract delete(): void;
}

class DraftDocumentItemState extends DocumentItemState {
    constructor() {
        super()
        this.name = "DraftDocument"
    }

    public publish(): void {
        console.log("На сайт отправлен текст")
        this.item.setState(new PublishDocumentItemState())
    }
    public delete(): void {
        console.log("Документ удален")
    }
}

class PublishDocumentItemState extends DocumentItemState {
    constructor() {
        super()
        this.name = "PublishDocument"
    }

    public publish(): void {
        console.log("Нельзя опубликовать опубликованный текст")
    }
    public delete(): void {
        console.log("Снято с публикации")
        this.item.setState(new DraftDocumentItemState())
    }
}

const item = new DocumentItem();
item.text = "Мой пост"
console.log(item.getState())
item.publishDoc()
console.log(item.getState())
item.publishDoc()
console.log(item.getState())
item.deleteDoc()
console.log(item.getState())
