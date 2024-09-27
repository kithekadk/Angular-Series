import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css'
})
export class LifecycleComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() productId!: number; // Receiving product ID as input
  @Input() selectedColor!: string; // Input property to track selected color
  product: any = {
    name: 'Sample Product',
    price: 99.99,
    stock: 10,
    thumbnail: 'https://via.placeholder.com/150'
  }; // Dummy product object
  lastCheckedQty: number = 0;

  // 1. ngOnInit: Initialize component and simulate fetching product details
  ngOnInit() {
    console.log('ngOnInit: Component initialized');
    // Simulate fetching product details
    this.lastCheckedQty = this.product.stock;
    console.log(`Product details fetched: ${this.product.name}, Stock: ${this.product.stock}`);
  }

  // 2. ngOnChanges: Detect changes in input properties
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedColor']) {
      console.log(`ngOnChanges: Selected color changed to ${changes['selectedColor'].currentValue}`);
      this.updateProductDisplay(changes['selectedColor'].currentValue);
    }
  }

  // 3. ngDoCheck: Manually detect changes not captured by Angular’s default change detection
  ngDoCheck() {
    if (this.lastCheckedQty !== this.product.stock) {
      console.log('ngDoCheck: Product stock has changed');
      this.lastCheckedQty = this.product.stock;
    }
  }

  // 4. ngAfterContentInit: Trigger actions after projecting external content (e.g., customer reviews)
  ngAfterContentInit() {
    console.log('ngAfterContentInit: Content initialized');
    this.loadCustomerReviews();
  }

  // 5. ngAfterContentChecked: Check content after change detection has completed
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked: Content checked');
    this.checkImagesLoaded();
  }

  // 6. ngAfterViewInit: Initialize product image slideshow after the view is initialized
  ngAfterViewInit() {
    console.log('ngAfterViewInit: View initialized');
    this.initializeImageSlider();
  }

  // 7. ngAfterViewChecked: Ensure the price is updated after each view check
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked: View checked');
    this.updatePriceDisplay();
  }

  // 8. ngOnDestroy: Clean up resources when the component is destroyed
  ngOnDestroy() {
    console.log('ngOnDestroy: Component is being destroyed');
  }

  // Helper methods for the lifecycle hooks

  updateProductDisplay(color: string) {
    // Simulate updating product display based on color
    console.log(`Product display updated for color: ${color}`);
  }

  loadCustomerReviews() {
    // Simulate loading customer reviews
    console.log('Customer reviews loaded');
  }

  checkImagesLoaded() {
    // Simulate checking if images are fully loaded
    console.log('Checking if product images are loaded');
  }

  initializeImageSlider() {
    // Simulate initializing a product image slider
    console.log('Product image slider initialized');
  }

  updatePriceDisplay() {
    // Simulate updating the price display
    console.log('Price display updated');
  }
}
