interface PaymentPersistant22 {
    id: number;
    sum: number;
    from: string;
    to: string;
}

// Omit позволяет взять наш тип или интерфейс и выкинуть оттуда ненужные свойства
type Payment22 = Omit<PaymentPersistant22, 'id'>

// Pick позволяет взять из нашего интерфейса только то что мы выберем
type PaymentRequisits = Pick<PaymentPersistant22, 'from' | 'to'>

// Extract позволяет в данном случае оставить только строки из union типа
type ExtractEx = Extract<'from' | 'to' | Payment22, string>;

// Exclude позволяет в данном случае оставить только то что не является строкой из union типа
type ExcludeEx = Exclude<'from' | 'to' | Payment22, string>;