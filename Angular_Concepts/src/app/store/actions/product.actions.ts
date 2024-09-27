// src/app/store/actions/product.actions.ts
import { createAction, props } from '@ngrx/store';

// Load Products Action
export const loadProducts = createAction('[Product List] Load Products');

// Load Products Success Action
export const loadProductsSuccess = createAction(
  '[Product List] Load Products Success',
  props<{ products: any[] }>() // Payload is the list of products
);

// Add to Cart Action
export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ product: any }>() // Payload is the product to add to the cart
);
