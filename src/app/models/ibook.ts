export interface IBook {
    _id: string,
    isbn: string,
    title: string,
    category: string,
    authors: string,
    publisher: string,
    year_published: string,
    page_count:number
    status: string,
    maxloan_days:number
}
