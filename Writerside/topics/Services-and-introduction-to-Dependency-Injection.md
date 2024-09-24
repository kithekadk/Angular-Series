# Services and introduction to Dependency Injection


Explore the core concepts of Angular Services and Dependency Injection (DI) to enhance the maintainability and scalability of your Angular applications. This structured guide includes examples and practical insights tailored for easy comprehension.

## Angular Services
Angular Services are singleton objects that provide a method of encapsulating reusable logic across different components without duplication. They are ideal for sharing data and functionalities like fetching data, user input validation, or logging directly.

## Why Use Angular Services?
Angular Services are essential for achieving clean, efficient, and reusable code. They promote a separation of concerns by handling specific functionalities outside components, reducing code duplication and increasing modularity.


> Services in Angular are typically singletons, meaning the same instance of a service is used throughout the application. This makes them ideal for sharing data and functionality across components.
{style="note"}

## Types of Services
- **Data Services**: Handle all data interactions, such as retrieving data from a server and submitting data changes.
- **Utility Services**: Provide common utilities like logging and error handling.
- **State Management Services**: Manage and maintain application state in a predictable manner.

## Creating a Service Using Angular CLI
To create a new service in your Angular application using the Angular CLI, use the following command:
```bash
ng generate service <serviceName>
```
> Or use shorthand command  
> `ng g s <serviceName>`

These commands generate a service file equipped with the `@Injectable()` decorator, making it ready to be injected into any component or other services.

### Example: Logger Service
Here’s how you can create a simple logging service in Angular:
```typescript
import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class LoggerService {
    log(message: string) {
      console.log(message);
    }
}
```
{style="note"}
>Using a Logger Service separates the concern of logging from components, centralizing logging logic which simplifies debugging and maintenance.


## Dependency Injection
Dependency Injection (DI) is a design pattern used by Angular to allow classes to request dependencies from external sources rather than creating them internally. Angular's DI framework provides dependencies to a class upon instantiation.

### Why Use Dependency Injection?
Dependency Injection in Angular simplifies the process of supplying external objects to a component or service, making the code more modular and testable.

{style="note"}
> Angular's DI system is hierarchical. This means that services can be provided at different levels (application, component, module), allowing for a fine-tuned control over their scope and lifetime.

## Types of DI
- **Constructor Injection**: The most common form of DI in Angular, where dependencies are provided through the class constructor.
- **Setter Injection**: This involves injecting dependencies through a setter method.
- **Interface Injection**: Dependencies are injected through an interface method. Angular does not natively support this, but it can be simulated.

## Dependency Injection in Components

### Example: Using Logger Service in a Component
To use the `LoggerService` within a component, you simply inject it via the constructor:
```typescript
import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private logger: LoggerService) {}

    ngOnInit() {
      this.logger.log('Application started');
    }
}
```
{style="note"}
> Injecting the Logger Service into the component decouples the component from the concrete logging implementation. This approach enhances modularity and testability, allowing you to replace the Logger Service without changing the components that use it.

## Dependency Injection in Services

Dependency Injection (DI) is a fundamental concept in Angular that facilitates the use of services within other services or components. It ensures that your classes are lean, efficient, and focused only on their intended purposes.

### Understanding Dependency Injection in Services

Dependency Injection (DI) in Angular helps in managing code dependencies between components and services, which simplifies the way you provision and use these dependencies. DI can be used to inject services within other services, making your application more modular and testable.

### Creating a Service

To understand how services receive dependencies via DI, let's start by creating a simple `LoggerService` that will be used to log messages to the console.

```typescript
// src/app/logger.service.ts
import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class LoggerService {
log(message: string): void {
console.log('LoggerService:', message);
}
}
```

This `LoggerService` is decorated with `@Injectable`, which marks it as available to be injected into other components or services.

### Injecting a Service into Another Service

Suppose you have a `HeroService` that depends on the `LoggerService`. Here’s how you would inject `LoggerService` into `HeroService`:

```typescript
// src/app/hero.service.ts
import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
providedIn: 'root'
})
export class HeroService {
constructor(private logger: LoggerService) {}

getHeroes(): void {
this.logger.log('Fetching heroes');
// Logic to fetch heroes
}
}
```

#### Explanation
- **Importing the Services**: Both the `HeroService` and `LoggerService` need to be imported at the top of the file.
- **Injectable Decorator**: The `@Injectable()` decorator declares that `HeroService` can have dependencies injected into it, similarly to `LoggerService`.
- **Constructor Injection**: The `LoggerService` is injected into the `HeroService` via the constructor. The private keyword not only declares a `logger` property on the class but also assigns the injected instance to that property.
