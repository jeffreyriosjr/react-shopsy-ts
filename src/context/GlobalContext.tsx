import React, {createContext, useState, useReducer } from 'react';
import instance from '../api/apiConfig';

// Initialized a default state for our app
const initialState = {
    products: [],
    cart: [],
    product: undefined,
    getProducts: () => {},
    getSingleProduct: () => {},
};

// Create our Global reducer
// reducer is a function that allows us to handle to update our useState
/*
 - reducer will take an intial state
 - will recieve an action declaration
 - will look to update our state based on the desired action
 - will return our updated state
*/
const appReducer = (state: any, action:any) => {
    
    switch (action.type) {
        case 'GET_PRODUCTS':
            // when a case matches, the return will update the state for us
            return {...state, products: action.payload };
            case 'GET_SINGLE_PRODUCT':
                // When a case matches, bind the payload to the product property in state
                return{...state, product: action.payload };
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


    return (
        <GlobalContext.Provider
         value={{ 
             products: state.products, 
             cart: state.cart,
             product: state.product,
             getProducts,
             getSingleProduct,
             }}>
            {children}
        </GlobalContext.Provider>
    );
};