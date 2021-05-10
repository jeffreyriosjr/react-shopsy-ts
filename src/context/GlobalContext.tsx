import React, {createContext, useState, useReducer } from 'react';
import instance from '../api/apiConfig';

// Initialized a default state for our app
const initialState = {
    products: [],
    cart: [],
    product: undefined,
    getProducts: () => {},
    getSingleProduct: () => {},
    addToCart: () => {}, 
};

// Create our Global reducer
// reducer is a function that allows us to handle to update our useState
/*
 - reducer will take an intial state
 - will recieve an action declaration
 - will look to update our state based on the desired action
 - will return our updated state
 - our reducer takes two parameters.
    - the first is our initialstate so that we can update it accordingly
    - the second param is the action object that gets passed into dispatch({type:'some_action', payload: some data})
*/
const appReducer = (state: any, action:any) => {
    
    switch (action.type) {
        case 'GET_PRODUCTS':
            // when a case matches, the return will update the state for us
            return {...state, products: action.payload };
            case 'GET_SINGLE_PRODUCT':
                // When a case matches, bind the payload to the product property in state
                return{...state, product: action.payload };
                case "ADD_TO_CART":
                    console.log('what is payload?', action.payload)
                    return{...state, cart: [...state.cart, action.payload] };
           default:
            return state;
    }
};

// Create Context from React
export const GlobalContext = createContext<InitialStateType>(initialState);

// Create GLobal provider which will feed state to our components
export const GlobalProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Actions = methods that run task for our app
    const getProducts = async () => {
        try {
            let { data } = await instance.get('/products');
            dispatch({ type:'GET_PRODUCTS', payload: data });
            } catch(e) {
                console.log(e);
        }
    };

    const getSingleProduct = async (productId:number) => {
        try {
            let {data} = await instance.get(`/products/${productId}`)
            console.log(data);
            dispatch({type:'GET_SINGLE_PRODUCT', payload: data})
        } catch (e) {
            console.log(e);
        }
    };

    const addToCart = (product:Product) => {
        // receive a product that we can then move into our cart array
        dispatch({type: "ADD_TO_CART", payload: product });
    };

    return (
        <GlobalContext.Provider
         value={{ 
             products: state.products, 
             cart: state.cart,
             product: state.product,
             getProducts,
             getSingleProduct,
             addToCart,
             }}>
            {children}
        </GlobalContext.Provider>
    );
};