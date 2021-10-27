import { PropertyToFilter } from "../models/property-to-filter.model";

export const propertiesToFilter: PropertyToFilter[] = [
    { property: "name" },
    { property: "exterior" },
    { property: "rarity" },
    { property: "type" },
    { property: "openable",
        select: true,
        options: [
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
            { value: "", label: "None" }
        ]
    }
];
