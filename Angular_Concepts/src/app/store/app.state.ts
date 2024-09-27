// src/app/store/app.state.ts
import { ProductState } from './reducers/product.reducer';

/**
 * Defines the overall state of the application, which is made up of different slices of state.
 */
export interface AppState {
  products: ProductState;
}
