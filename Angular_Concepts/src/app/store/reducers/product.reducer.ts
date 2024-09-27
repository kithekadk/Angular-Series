// src/app/store/reducers/product.reducer.ts

// Define the shape of the product-related state
export interface ProductState {
  products: any[];
  cart: any[];
}

// Initial state
export const initialState: ProductState = {
  products: [],
  cart: []
};

// Reducer function
import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess, addToCart } from '../actions/product.actions';

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products
  })),
  on(addToCart, (state, { product }) => ({
    ...state,
    cart: [...state.cart, product]
  }))
);
