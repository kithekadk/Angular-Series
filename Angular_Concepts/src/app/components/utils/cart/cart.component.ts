import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { selectCart } from '../../../store/selectors/product.selectors';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart$: Observable<any[]> = this.store.select(selectCart); // Select the cart from the store

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // The cart data is already in the store, so we don't need to dispatch any actions here
  }
}
