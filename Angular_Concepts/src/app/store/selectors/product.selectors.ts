// src/app/store/selectors/product.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

// Select the product slice of the state
export const selectProducts = (state: AppState) => state.products.products;

// Selector to get cart from the state
export const selectCart = (state: AppState) => state.products.cart;
