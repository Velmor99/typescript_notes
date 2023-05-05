/*
    Builder паттерн используется например в библиотеке mongoose
    для запросов, паттерн позволяет вынести какую то часть логики построения
    объекта в рамках классбилдера
    Суть паттерна в том что у нас есть класс builder который позволяет нам собрать объект,
    мы даем этому классу задания - установить одно, установить другое
    и в конечном итоге делаем метод build который и собирает нам объект с данными
    Важный пункт при построении такого класса, он должен быть чейнбл, то есть реализовывать цепочку вызовов
*/

enum ImageFormat {
    Png = 'png',
    Jpeg = 'jpeg'
}

interface IResolution {
    width: number;
    height: number;
}

interface IImageConversion extends IResolution {
    format: ImageFormat;
}

class ImageBuilder {
    private formats: ImageFormat[] = []
    private resolution: IResolution[] = []

    addPng() {
        if(this.formats.includes(ImageFormat.Png)) {
            // в методах мы возвращаем this, то есть этот же объект,
            // что бы он был чейнбл, то есть вызывать его методы друг за другом
            return this;
        }
        this.formats.push(ImageFormat.Png)
        return this
    }

    addJpeg() {
        if(this.formats.includes(ImageFormat.Jpeg)) {
            return this;
        }
        this.formats.push(ImageFormat.Jpeg)
        return this
    }

    addResolution({width, height}: IResolution) {
        this.resolution.push({width, height})
        return this;
    }

    // возвращает уже результат
    exec(): IImageConversion[] {
        const res: IImageConversion[] = [];
        for(const r of this.resolution) {
            for(const f of this.formats) {
                res.push({
                    format: f,
                    width: r.width,
                    height: r.height
                })
            }
        }
        return res;
    }
}

console.log(new ImageBuilder()
    .addJpeg()
    .addPng()
    .addResolution({width: 100, height: 200})
    .addResolution({width: 150, height: 250})
    .exec()
)

/*
    [
        { format: 'jpeg', width: 100, height: 200 },
        { format: 'png', width: 100, height: 200 },
        { format: 'jpeg', width: 150, height: 250 },
        { format: 'png', width: 150, height: 250 }
    ]  
*/