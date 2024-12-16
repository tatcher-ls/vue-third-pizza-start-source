import { useDataStore } from "../../stores/data";
import { ingredientsQuantity } from "../../common/helpers/ingredients-quantity";
import {OrderPizza, Pizza} from "../../types/interfaces";

export const pizzaPrice = (pizza: Pizza) => {
    const dataStore = useDataStore();

    const ingredientsQty = ingredientsQuantity(pizza);

    const sizeMultiplier =
        dataStore.sizes.find(itemSize => itemSize.id === pizza.sizeId)?.multiplier ?? 1;

    const doughPrice =
        dataStore.doughData.find(itemDough => itemDough.id === pizza.doughId)?.price ?? 0;

    const saucePrice =
        dataStore.sauces.find(itemSauce => itemSauce.id === pizza.sauceId)?.price ?? 0;

    const ingredientsPrice =
        dataStore.ingredients.
        map(item => ingredientsQty[item.id] * item.price).
        reduce((acc, item) => acc + item, 0);


    return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};
