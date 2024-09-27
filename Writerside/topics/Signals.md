# Signals

In **Angular 18**, a major addition to the ecosystem is **Signals**. Signals enable developers to manage state reactively without the complexity of using RxJS Observables or Subject-based patterns. Inspired by reactive programming concepts, signals in Angular allow automatic tracking of changes in state and reactivity across the application.

Angular Signals provide a simpler, more direct way to manage state and update the UI when state changes, without manually subscribing or unsubscribing to observables.

---

## What are Signals?

**Signals** are reactive primitives used to manage and track state changes within an Angular component. Signals in Angular are conceptually similar to **state** in other frameworks like React. However, Angular provides an advanced **reactive model** with signals, allowing state changes to be automatically tracked and reflected in the component.

**Key Characteristics of Signals**:
1. **Reactivity**: Automatically track state changes and update the UI.
2. **Declarative**: Signals provide a declarative approach to handling data changes.
3. **Simplicity**: No need for explicit subscriptions or unsubscriptions.
4. **Performance Optimized**: Angular's built-in change detection works efficiently with signals.

## Creating a Signal

To create a signal in Angular, you define a signal using the `signal()` function. Signals are values that Angular tracks over time and rerenders the component when the signal changes.

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <h1>{{ counter() }}</h1>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
  `,
})
export class CounterComponent {
  counter = signal(0);  // Create a signal with an initial value of 0

  increment() {
    this.counter.update(count => count + 1);
  }

  decrement() {
    this.counter.update(count => count - 1);
  }
}
```
## Accessing Signal Values
To access the value of a signal, you invoke it like a function: `signal()`. This means you can easily bind signal values in your templates or use them programmatically.

```typescript
<h1>{{ counter() }}</h1>  // Access the value of the signal in the template
```

## Updating Signal Values
To update the value of a signal, you can use:

- `set(newValue)`: Set the signal to a new value.
- `update(fn)`: Modify the signal value based on its current state.

```typescript
increment() {
    this.counter.set(this.counter() + 1);  // Directly set a new value
}

decrement() {
    this.counter.update(count => count - 1);  // Update based on the current value
}
```
## Signals vs Observables

**Signals** and **Observables** both handle state reactively, but they differ in how they approach it:

- **Signals** are simpler and more direct. You can mutate state without the need to subscribe and unsubscribe manually.
- **Observables** are more powerful for handling asynchronous streams of data (e.g., HTTP requests, user events). They offer various operators to manipulate data streams, but they can be more complex for simple state management.

Use **Signals** for managing local state inside components, especially if you are dealing with simple, `synchronous` data. For `asynchronous` or more complex scenarios (e.g., HTTP calls, WebSockets), **Observables** are still preferred.

## Advanced Signal Features

## Effects
Angular's **signal** system also includes effects. An **effect** runs whenever one of its dependent signals changes. This allows you to trigger side effects (such as logging or making HTTP calls) in response to changes in signal values.

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
selector: 'app-log',
standalone: true,
template: `
    <button (click)="increment()">Increment</button>
  `,
})
export class LogComponent {
    counter = signal(0);
    
    // Effect: log whenever the counter changes
    logEffect = effect(() => {
        console.log(`Counter value: ${this.counter()}`);
    });
    
    increment() {
        this.counter.update(count => count + 1);
    }
}
```

In the example above, the **effect** automatically runs whenever `counter` changes, logging the new counter value to the console.

## Computed Signals
In Angular 18, **computed signals** allow you to derive a value based on other signals. Computed signals automatically track the signals they depend on and recompute whenever those signals change.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
selector: 'app-cart',
standalone: true,
template: `
    <h1>Item Price: {{ itemPrice() }}</h1>
    <h2>Tax (10%): {{ tax() }}</h2>
    <h2>Total: {{ total() }}</h2>
  `,
})
export class CartComponent {
    itemPrice = signal(100);  // Base item price signal
    tax = computed(() => this.itemPrice() * 0.1);  // Derived tax signal
    total = computed(() => this.itemPrice() + this.tax());  // Derived total signal
}
```

Here, the `tax` and `total` signals are computed based on the `itemPrice` signal. Any change to `itemPrice` automatically updates both `tax` and `total`.

## Signals in Forms
**Signals** can also be used to manage state in **Angular forms**. Here's an example of how signals can work in a simple login form:

```typescript
import { Component, signal } from '@angular/core';

@Component({
selector: 'app-login',
standalone: true,
template: `
    <h2>Login Form</h2>
    <form (ngSubmit)="submitForm()">
      <label>
        Username:
        <input [(ngModel)]="username.value" />
      </label>
      <label>
        Password:
        <input type="password" [(ngModel)]="password.value" />
      </label>
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
    username = signal('');  // Signal to track username input
    password = signal('');  // Signal to track password input
    
    submitForm() {
        console.log('Logging in:', this.username(), this.password());
    }
}
```

In this example, **signals** are used to track changes in form inputs. The **signal-based form management** simplifies how you track state across form fields without needing complex `subscriptions` or `two-way data binding`.

## Signals and Change Detection
**Change Detection** is one of the core mechanisms in Angular. Signals automatically trigger change detection when their value changes. This makes signals an ideal choice for managing **reactive state**, as Angular's change detection system automatically updates the DOM whenever a signal's value is modified.

Unlike traditional manual change detection that requires calling `markForCheck()` or `detectChanges()`, signals track dependencies and update the component view as soon as the signal value changes.

### Tips and Best Practices
- **Use Signals for Local State:** If you're managing state that's local to a component (such as form values, counters, or product lists), use signals for simplicity and ease of reactivity.

- **Use Computed Signals for Derived State:** Whenever one signal depends on another, use computed signals to derive the dependent state. This reduces code duplication and ensures that derived values are always in sync.

- **Use Effects for Side Effects:** Use effects to react to signal changes and perform side effects (e.g., logging, making HTTP requests). This separates side effects from business logic and keeps your code cleaner.

- **Use Signals with Forms:** Signals can simplify tracking form state by using them in place of more complex state management solutions for small, simple forms.

