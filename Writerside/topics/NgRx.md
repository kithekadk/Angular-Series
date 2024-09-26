# NgRx

NgRx is an Angular library used for **state management** in large-scale applications. It uses a **unidirectional data flow**, following the principles of **Redux** to manage application state predictably and efficiently. This guide will take you through the basics of NgRx, using a **real-life scenario** for easy understanding. We'll cover actions, reducers, selectors, effects, and services in a structured format.

## Scenario: Online Grocery Store

Imagine you are building an **Online Grocery Store**. Your application has a list of products, a cart, and an authentication system for logging in users. Managing the state of these entities (products, cart, user) can get complicated, especially when multiple components are interacting with them. This is where **NgRx** comes into play to make state management easier and predictable.

## What is NgRx?

NgRx allows you to manage your application's state in a **single source of truth** (the store), which is immutable and can be accessed by any component.

- **Why use NgRx?**
    - Single source of truth for your state.
    - Predictable state transitions.
    - Easy to debug and test.
    - Clear separation of concerns between state and UI.


## Setting Up NgRx in Your Project

## 1. **Install NgRx** ##

```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
```

This will install the necessary NgRx packages for state management and effects.

## 2. Create Actions ##
Actions are dispatched from the application to express events. They contain a type and payload.

**Example:**
For our grocery store, you might have actions for loading products, adding items to the cart, or logging in users.

```typescript
// src/app/store/actions/product.actions.ts
import { createAction, props } from '@ngrx/store';

// Load Products Action
export const loadProducts = createAction('[Product List] Load Products');

// Load Products Success Action
export const loadProductsSuccess = createAction(
  '[Product List] Load Products Success',
  props<{ products: any[] }>() // Payload will be the list of products
);

// Add to Cart Action
export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ product: any }>() // Payload is the product to add to the cart
);
```

## 3. Create Reducers ##
Reducers define how the state changes in response to actions. A reducer takes the current state and an action, then returns the new state.

**Example:**
Let's create a reducer for handling products and the cart in our grocery store.

```typescript
// src/app/store/reducers/product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess, addToCart } from '../actions/product.actions';

// Initial State
export const initialState = {
  products: [],
  cart: []
};

// Reducer for Product and Cart
export const productReducer = createReducer(
  initialState,
  
  // When products are successfully loaded
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: products
  })),
  
  // Add product to cart
  on(addToCart, (state, { product }) => ({
    ...state,
    cart: [...state.cart, product] // Add product to cart array
  }))
);
```

> Reducers should be pure functions, meaning they return a new state object without mutating the old state.
{ style="note" }

## 4. Define the shape of the application ##

1. Create the **`app.state.ts`** file where you'll define the shape of the entire application's state.

2. In the `app.state.ts` file, define an interface that represents the overall shape of your application's state.

This interface should contain slices of state (also called `reducers`) that manage different parts of your application. For example, the `ProductState` for product and cart management.

### `app.state.ts` Example: ###

```typescript
// src/app/store/app.state.ts
import { ProductState } from './reducers/product.reducer';

/**
* Defines the overall shape of the application state.
* The `AppState` interface includes all the slices of state (like `products`) needed in the app.
  */
  export interface AppState {
  products: ProductState; // Add the `products` slice of state to the AppState
  }
```

#### Explanation ####
-  **AppState:** This is the root state interface for the application. It will include slices of the state, such as the products slice.
-  **ProductState:** Represents the shape of the state related to products and cart. This is imported from the reducer responsible for handling products.

## 5. Create Selectors ##
Selectors are used to query specific parts of the state. This helps components fetch data from the store.

**Example:**
We will create selectors for retrieving the product list and the cart items from the store.

```typescript
// src/app/store/selectors/product.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

// Select the product slice of state
export const selectProducts = (state: AppState) => state.products;

// Select the cart slice of state
export const selectCart = (state: AppState) => state.cart;
```
{ style="tip" }
> **Tip:**
Selectors are reusable and help decouple the state structure from the component logic. Always use selectors instead of directly accessing the state.

## 6. Create Effects ##
Effects are used to handle side effects like HTTP requests or interacting with services. Effects listen for actions and can dispatch other actions based on asynchronous operations like fetching data from an API.

**Example:**
In our grocery store, we need to load products from an API. We will use an effect to handle this asynchronous task.

```typescript
// src/app/store/effects/product.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import { loadProducts, loadProductsSuccess } from '../actions/product.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  // Effect to load products
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts), // Listen for the loadProducts action
      mergeMap(() => this.productService.getProducts() // Make the API call
        .pipe(
          map(products => loadProductsSuccess({ products })) // Dispatch loadProductsSuccess
        ))
    )
  );
}
```

> `ofType` filters the actions, and `mergeMap` handles asynchronous tasks. The `effect` listens for the `loadProducts action`, fetches the products from the service, and dispatches the `loadProductsSuccess` action with the data.
{ style="note" }

## 7. Services ##
Services are used to make API calls. They interact with external data sources and are injected into effects.

**Example:**
A simple service that fetches products from an API.

```typescript
// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products'; // DummyJSON API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetch products from the DummyJSON API.
   * @returns {Observable<any[]>} - Observable containing the list of products.
   */
  getProducts(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.products) // Extract the products array from the response
    );
  }
}
```

## 8. Add NgRx Store and Effects to the App ##
In your `app.config.ts` or `main.ts` (for standalone components), import StoreModule and EffectsModule.

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducer';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),     provideStore({ products: productReducer }), // Register the product reducer
    provideEffects([ProductEffects]), // Register the effects
    provideHttpClient(withFetch())
    ]};
```

## 9. Component Interaction with the Store ##
In your Angular components, you can dispatch actions to modify the state and use selectors to read data from the store.

#### **Example: Product List Component** ####
This component will dispatch the `loadProducts` action and select products from the store to display them.

```typescript
// src/app/components/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { loadProducts, addToCart } from '../../store/actions/product.actions';
import { selectProducts } from '../../store/selectors/product.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let product of products$ | async">
      {{ product.name }} - ${{ product.price }}
      <button (click)="addToCart(product)">Add to Cart</button>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products$: Observable<any[]> = this.store.select(selectProducts); // Select products from the store

  constructor(private store: Store<AppState>) {} // Inject the store

  ngOnInit() {
    this.store.dispatch(loadProducts()); // Dispatch loadProducts action on component initialization
  }

  // Dispatch addToCart action when a product is added to the cart
  addToCart(product: any) {
    this.store.dispatch(addToCart({ product }));
  }
}
```
## 10. Using the StoreDevtools ##
**NgRx DevTools** allows you to inspect and debug the state of your application. You can time travel through the state and replay actions.

Add `StoreDevtoolsModule` to your `app.module.ts`:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducer';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),     provideStore({ products: productReducer }), // Register the product reducer
    provideEffects([ProductEffects]), // Register the effects
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideHttpClient(withFetch())
    ]};
```


NgRx helps to efficiently manage state in Angular applications by providing a structured and predictable way to handle state changes. In our example, we built a simple `Online Grocery Store` using `NgRx`, where:

- **Actions** were used to express events (loading products, adding to cart).
- **Reducers** defined how the state changes.
- **Selectors** provided a clean way to access specific parts of the state.
- **Effects** handled side effects like fetching data from an API.

By following the principles of NgRx, you can create scalable and maintainable Angular applications. Use NgRx to decouple your application state from your UI and make debugging, testing, and scaling easier!

> **Tip:** Always think about `immutability` when working with `NgRx`. Never mutate the state directly; instead, return a new state object in your reducers.
{style="tip"}