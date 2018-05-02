export interface ILoan {
    _id: number,
    customerID: number,
    firstName: string,
    lastName: string,
    isbn: string,
    title: string,
    bookID: number,
    loaned_date: string,
    due_date: string,
    return_date: string,
    status: string
}
