interface IPayment {
    sum: number,
    from: number,
    to: number
}

interface IRequest extends IPayment {}

enum EnumStatus {
    "success",
    "failed",
    "processing"
}

interface IData extends IPayment {
    databaseId: number,
}

interface IDataFaled {
    errorMessage: string,
    errorCode: number
}

interface ISuccess {
    status: EnumStatus.success,
    data: IData
}

interface IFailed {
    status: EnumStatus.failed,
    data: IDataFaled,
}

type f = (res: ISuccess | IFailed) => number

type Res = ISuccess | IFailed

function calculateResponse(res: Res): number {
    if(isSuccess(res)) {
        return res.data.databaseId
    } else {
        throw new Error(res.data.errorCode.toString())
    }
}

function isSuccess(res: Res): res is ISuccess {
    return res.status === EnumStatus.success
}