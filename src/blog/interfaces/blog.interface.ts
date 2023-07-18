export interface IBlog {
    title: string;
    content: string
    date: Date;
    category: String;
}

export interface ISearch {
    search?: string
    category?: string
}