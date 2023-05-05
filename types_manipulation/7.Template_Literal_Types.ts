type ReadOrWrite = 'read' | 'write';
type Bulk = 'bulk' | ''

// Lowercase, Capitalize
type Access = `can${Uppercase<ReadOrWrite>}${Capitalize<Bulk>}`

// обратная распаковка
type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never

type T = ReadOrWriteBulk<Access>
// обратная распаковка

type ErrorOrSuccess = 'error' | 'success';

interface ResponseT {
    result: `http${ErrorOrSuccess}`
}

const a7: ResponseT = {
    result: 'httpsuccess'
}

// case может быть в анимации типа fadeIn / fadeOut