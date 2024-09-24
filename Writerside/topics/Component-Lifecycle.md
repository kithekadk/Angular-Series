# Component Lifecycle


The Angular Component Lifecycle is crucial for effectively managing how components are created, rendered, and destroyed in an Angular application. This guide delves into the lifecycle hooks provided by Angular, using a relatable case scenario of a simple online store product page to illustrate each stage.

## What Are Lifecycle Hooks ?
Lifecycle hooks are special functions that provide visibility into the key life moments of Angular components, allowing you to perform specific actions at set phases of a component's life cycle.

## The Lifecycle Hooks
Angular provides several lifecycle hooks that you can use to tap into specific moments in a component’s life:

## 1. **ngOnInit**
- **Description**: Initializes the component and sets the input properties.
- **Scenario**: When a product page loads, `ngOnInit` is used to fetch the product details from a server and initialize default states like quantity and color selections.
  ```typescript
  ngOnInit() {
      this.productService.getProduct(this.productId).subscribe(product => {
      this.product = product;
   });
  }
  ```
  {style="note"}

## 2. **ngOnChanges**
- **Description**: Called whenever there is a change to input properties of the component.
- **Scenario**: If the user selects a different color for a product, `ngOnChanges` triggers to update the product image and details accordingly.
  ```typescript
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedColor']) {
      this.updateProductDisplay(changes['selectedColor'].currentValue);
    }
  }
  ```
  {style="note"}

## 3. **ngDoCheck**
- **Description**: Detects and acts upon changes that Angular can't or won't detect on its own.
- **Scenario**: Detects changes in the quantity of the product that aren't captured by Angular's default change detection.
  ```typescript
  ngDoCheck() {
      if (this.lastCheckedQty !== this.product.qty) {
        console.log('Quantity has changed');
        this.lastCheckedQty = this.product.qty;
      }
  }
  ```
  {style="note"}

## 4. **ngAfterContentInit**
- **Description**: Called after Angular projects external content into the component's view.
- **Scenario**: Useful for actions after loading content like customer reviews below the product details.
  ```typescript
  ngAfterContentInit() {
      this.loadCustomerReviews();
  }
  ```
  {style="note"}

## 5. **ngAfterContentChecked**
- **Description**: Called after the default change detector has completed checking all content of a directive.
- **Scenario**: Checks that all images or reviews have loaded every time the content is checked.
  ```typescript
  ngAfterContentChecked() {
      this.checkImagesLoaded();
  }
  ```
  {style="note"}

## 6. **ngAfterViewInit**
- **Description**: Called after Angular initializes the component's views and child views.
- **Scenario**: Perfect for initializing a slideshow of the product images.
  ```typescript
  ngAfterViewInit() {
      this.initializeImageSlider();
  }
  ```
  {style="note"}

## 7. **ngAfterViewChecked**
- **Description**: Called after the component's view, and child views have been checked by the change detection mechanism.
- **Scenario**: Ensures that the price displayed is updated whenever the user changes the product variant.
  ```typescript
  ngAfterViewChecked() {
      this.updatePriceDisplay();
  }
  ```
  {style="note"}

## 8. **ngOnDestroy**
- **Description**: Cleans up just before Angular destroys the component.
- **Scenario**: Useful for unsubscribing from services or timers to prevent memory leaks when the user navigates away from the product page.
  ```typescript
  ngOnDestroy() {
      if (this.productSubscription) {
        this.productSubscription.unsubscribe();
      }
  }
  ```
  {style="note"}
