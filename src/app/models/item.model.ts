export interface Item {
    _id: string,
    name: string,
    iconUrl: string,
    type: string,
    weaponType: string,
    gunType: string,
    exterior: string,
    rarity: string,
    rarityColor: string,
    price: number,
    purchasable: boolean,
    openable: boolean,
    content: any,
    [key: string]: string | boolean | number | string[] | any
}