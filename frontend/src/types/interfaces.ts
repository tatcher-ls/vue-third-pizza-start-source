export interface DoughItem {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

export interface Ingredient {
    id: number;
    name: string;
    image: string;
    price: number;
}

export interface Size {
    id: number;
    name: string;
    image: string;
    multiplier: string;
}
