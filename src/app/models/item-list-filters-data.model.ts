export interface ItemListFiltersData {
    name?: string,
    type?: string,
    exterior?: string,
    limit?: number,
    sorting?: {
        [key: string]: string
    }
}