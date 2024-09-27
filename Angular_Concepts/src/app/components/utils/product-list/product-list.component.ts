import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { loadProducts, addToCart } from '../../../store/actions/product.actions';
import { selectProducts } from '../../../store/selectors/product.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
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
