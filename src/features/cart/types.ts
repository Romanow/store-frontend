import {Item} from "../../types";

export interface CartItem {
    item: Item;
}

export interface CartState {
    items: CartItem[];
}
