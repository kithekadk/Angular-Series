import { CommonModule } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export class SignalsComponent {
  // Simple Counter Signal
  counter = signal(0);

  // Computed Signals for Cart Example
  itemPrice = signal(100);  // Item price signal
  tax = computed(() => this.itemPrice() * 0.1);  // Tax based on item price (10%)
  total = computed(() => this.itemPrice() + this.tax());  // Total price (item + tax)

  // Login Form Signals
  username = signal('');  // Signal for username input
  password = signal('');  // Signal for password input

  // Effect Example: Logging Counter Value
  logEffect = effect(() => {
    console.log(`Counter value: ${this.counter()}`);
  });

  // Methods to update the counter
  increment() {
    this.counter.update(count => count + 1);
  }

  decrement() {
    this.counter.update(count => count - 1);
  }

  // Form submission
  submitForm() {
    console.log('Logging in:', this.username(), this.password());
  }
}
