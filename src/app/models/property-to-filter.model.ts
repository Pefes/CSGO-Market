export interface PropertyToFilter {
    property: string;
    select?: boolean;
    options?: { value: string, label: string }[];
}
