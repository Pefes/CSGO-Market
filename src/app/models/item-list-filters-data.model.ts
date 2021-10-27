export interface ItemListFiltersData {
    name?: string;
    type?: string;
    exterior?: string;
    openable?: string;
    rarity?: string;
    sorting?: {
        [key: string]: string
    };
    [key: string]: string | undefined | { [key: string]: string };
}
