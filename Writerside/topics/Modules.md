# Modules


Angular modules (NgModules) are fundamental building blocks of Angular applications. This guide delves deep into the nature of Angular modules, explaining each concept in detail to ensure a thorough understanding.


> **Reminder**: Modules are not used in Angular 18
{style="note"}

## What is an Angular Module?

Angular modules, distinguished by the `@NgModule` decorator, organize code into blocks of functionality that are cohesive, reusable, and manageable. They encapsulate components, directives, pipes, and services into functional sets which can be imported by other modules.

## Structure of an Angular Module

Each module is a class decorated with `@NgModule`, which declares its application on a block of code:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
declarations: [],
imports: [CommonModule, FormsModule],
providers: [],
exports: []
})
export class FeatureModule { }
```

## Key Properties of NgModule

#### Declarations

Defines the view classes that belong to the module. Angular has three kinds of view classes: components, directives, and pipes.

```typescript
declarations: [AppComponent, HeaderComponent, FooterComponent]
```

{style="note"}
> **Reminder**: Only declare components, directives, and pipes in one module. Attempting to redeclare classes that belong to another module will result in a runtime error.

#### Imports

Enables the current module to use functionalities exported from other modules.

```typescript
imports: [BrowserModule, UserModule, SharedModule]
```

#### Providers

Registers service providers at the application level or module level, depending on where the module is imported.

```typescript
providers: [UserService, {provide: 'API_KEY', useValue: 'XYZ'}]
```

> **Note**: Preferably use the `providedIn` property of the `@Injectable()` decorator to make services available application-wide or scoped to a module.
{style="note"}

#### Exports

Exports components, directives, and pipes that other modules can use if they import this module.

```typescript
exports: [SharedComponent, CommonModule]
```

#### Bootstrap

Only used in the root module, this property defines the root component that Angular creates and inserts into the index.html host web page.

```typescript
bootstrap: [AppComponent]
```

## Advanced Concepts in Angular Modules

## Feature Modules

Feature modules are Angular modules designed for a specific business domain, user workflow, or closely related set of capabilities.

{style="note"}
> **Best Practice**: Use feature modules to enhance modularity by encapsulating functionality, reducing the complexity of your root module, and promoting lazy loading.

## Lazy Loading Modules

Lazy loading helps to split the application into several bundles which are loaded dynamically on demand. Use the Angular Router to configure lazy loading:

```typescript
{ path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) }
```

## SharedModule

SharedModule allows for common components, directives, and pipes to be shared among the features of an application without having to reimport the common module everywhere.

```typescript
@NgModule({
declarations: [SharedDirective, SharedPipe],
exports: [SharedDirective, SharedPipe, CommonModule, FormsModule]
})
export class SharedModule { }
```

## CoreModule

The CoreModule takes on the role of providing services and components that are only supposed to be created once by the AppModule. Typically includes services, universal components, and other singleton classes.

```typescript
@NgModule({
providers: [AppConfig, ErrorHandler],
imports: [CommonModule],
exports: [NavBarComponent]
})
export class CoreModule { }
```

{style="note"}
> **Tip**: Import CoreModule in the AppModule only to ensure singletons are not recreated.


> **Critical Note**
> - **Performance Impact** Improper use of modules can lead to performance bottlenecks, affecting the initial load time and overall speed of the application.
> - **Strategic Planning Required** It is crucial to strategically plan the architecture of modules to prevent issues like deep nesting and excessive reliance on shared modules.
> - **Avoid Duplication** Mismanagement of shared modules can lead to duplication in bundles, which can slow down the application.
> - **Thoughtful Dependency Management** Proper use of Angular modules goes beyond code organization. It includes a thoughtful approach to how modules interact and manage dependencies across the application.
> - **Optimize for Scalability** Modules should be structured to promote scalability and maintainability without compromising performance.

{style="note"}