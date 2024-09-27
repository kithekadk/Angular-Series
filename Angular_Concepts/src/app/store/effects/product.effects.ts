// src/app/store/effects/product.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductNgrxService } from '../../services/product-ngrx.service';
import { loadProducts, loadProductsSuccess } from '../actions/product.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductNgrxService) {}

  // Effect to load products from DummyJSON API
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
