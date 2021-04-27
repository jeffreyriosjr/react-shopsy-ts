import React, {createContext, useState, useReducer } from 'react';

// Initialized a default state for our app
const initialState = {
    products: [],
    cart: [],
    getProducts: () => {},
};

// Create our Global reducer
// reducer is a function that allows us to handle to update our useState
/*
 - reducer will take an intial state
 - will recieve an action declaration
 - will look to update our state based on the desired action
 - will return our updated state
*/
const appReducer = (state:any, action:any) => {
    
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {...state, products: action.payload };
        default:
            return state;
    }
};

// Create Context from React
export const GlobalContext = createContext<InitialStateType>(initialState);

// Create GLobal provider which will feed state to our components
export const GlobalProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const getProducts = async () => {
        try {
            let prods = await (
                await fetch('https://fakestoreapi.com/products')
            ).json();
            
            dispatch({ type:'GET_PRODUCTS', payload: prods });

            } catch(e) {
            console.log(e);
        }
    };

    return (
        <GlobalContext.Provider
         value={{ products: state.products, cart: state.cart, getProducts }}>
            {children}
        </GlobalContext.Provider>
    );
};