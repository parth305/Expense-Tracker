export enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}
export let mydata:DataInterface = {
    report: [{
        id:"uuid",
        source:"salary",
        amount:123,
        created_at:new Date(),
        updated_at:new Date(),
        type:ReportType.INCOME
    },
    {
        id:"uuid1",
        source:"Food",
        amount:12213,
        created_at:new Date(),
        updated_at:new Date(),
        type:ReportType.EXPENSE
    },
]
}

export interface DataInterface {
    report: {
        id: string,
        source: string,
        amount: number,
        created_at: Date,
        updated_at: Date,
        type: ReportType,
    }[];
}


