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
    value?: string;
}

export interface Size {
    id: number;
    name: string;
    image: string;
    multiplier: number;
}

export interface Sauce {
    id: number;
    name: string;
    price: number;
}
