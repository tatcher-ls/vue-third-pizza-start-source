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

export interface Order {
    id: number;
    userId: string;
    addressId: number;
    orderPizzas: Array<OrderPizza>;
    orderMisc: Array<OrderMisc>;
    orderAddress: OrderAddress;
}

export interface OrderPizza {
    id: number;
    name: string;
    sauceId: number;
    doughId: number;
    sizeId: number;
    quantity: number;
    orderId: number;
    ingredients: Array<Ingredient>;
}

export interface Ingredient {
    id: number;
    pizzaId: number;
    ingredientId: number;
    quantity: number;
}

export interface OrderMisc {
    id: number;
    orderId: number;
    miscId: number;
    quantity: number;
}

export interface OrderAddress {
    id: number;
    name: string;
    street: string;
    building: string;
    flat: string;
    comment: string;
    userId: string;
}

export interface Misc {
    id: number
    name: string
    image: string
    price: number,
    quantity?: number
}

export interface Cart {
    phone: string,
    address: Address,
    pizzas: Array<PizzaCart>,
    misc: Array<Misc>,
}

export interface Pizza {
    index: string,
    name: string,
    sauceId: number,
    doughId: number,
    sizeId: number,
    ingredients: Array<Ingredient>,
}

export interface PizzaCart {
    name: string,
    quantity: number,
    dough: DoughItem,
    size: Size,
    sauce: Sauce,
    ingredients: Array<Ingredient>,
    price: number,
    doughId: number,
    sizeId: number,
    sauceId: number
}

export interface Address {
    street: string,
    building: string,
    flat: string,
    comment: string,
}
