/*
{
id:1,
title:'...',
price:'...',
category:'...',
description:'...',
image:'...'
},
*/ 

type Product = {
    product: Product;
    id: number;
    title: string;
    quantity: number;
    price: string;
    category: string;
    description: string;
    image: string;
}

// class Product {
//     constructor(id, title, price, category, description, image {})
// }

type CartItem = {
    id: number;
    quantity: number;
    product: Product;
    image: string;
}

// Define a state type
type InitialStateType = {
    products: Product[];
    cart: Product[];
    product: Product | undefined;
    is_loading: boolean;
    getProducts: () => void;
    getSingleProduct: (productId:number) => void;
    addToCart: (product:Product) => void;
};

