export interface Item {
    uid: string;
    name: string;
    manufacturer?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
}

export interface Order {
    orderUid: string;
    items: Item[];
    total?: number;
    status?: string;
    createdAt?: string;
}
