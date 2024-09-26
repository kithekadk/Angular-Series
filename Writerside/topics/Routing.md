# Routing

Angular Routing plays a critical role in single-page applications by enabling navigation between different views or components without leaving the page. This guide covers all aspects of routing in Angular, including setup, route configuration, parameter passing, and guarding routes.

## Understanding Angular Routing

Angular's Router module enables the creation of rich, navigable applications. It interprets browser URLs as instructions to navigate to a client-generated view and passes optional parameters to support deep linking and navigation state.

## Setting Up Angular Routing

To use the Router, you need to set up routing in your Angular application:

### Import Routes
First, import `Routes` in your `app.config.ts` file:

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

/**
 * The application's route definitions. Each route maps a path to a component.
 */
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

```

### App Component Template
In your main HTML template, add the `<router-outlet></router-outlet>` directive. This acts as the placeholder where the router renders the component based on the current route.

```html
<!-- app.component.html -->
<router-outlet></router-outlet>
```

## Configuring Routes

Routes in Angular are defined as an array of `Route` objects. Each `Route` maps a URL path to a component.

### Basic Route Configuration
Here’s how to define routes that map path to components:

```typescript
const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent }
];
```

### Wildcard and Redirect Routes
- **Wildcard Route**: Catches undefined paths and handles them gracefully.
- **Redirect Route**: Redirects to a specified route.

```typescript
const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', component: PageNotFoundComponent }
];
```
>When building single-page applications (SPAs) with Angular standalone components, you need to configure a provider for handling routing with data fetched from a server. Here's how you configure the inbuilt provider that leverages the `withFetch()` method for routing. In the providers array in `app.config.ts` import `provideHttpClient` and `withFetch`, the in the providers array add `provideHttpClient(WithFetch())` as a new entry.
{style="note"}
## Navigating with Router

### RouterLink Directive
In your templates, use the `RouterLink` directive to enable navigation:

```html
<a routerLink="/home">Home</a>
<a routerLink="/about">About Us</a>
```

### Programmatic Navigation
For programmatic navigation within your components, use the `Router` service:

```typescript
import { Router } from '@angular/router';

@Component({...})
export class AppComponent {
    constructor(private router: Router) {}

    goToPage(pageName: string): void {
        this.router.navigate([pageName]);
    }
}
```
> You can also use `navigateByUrl()` method ie `this.router.navigateByUrl(pageName)`
{style="note"}

## Difference Between `navigate()` and `navigateByUrl()` in Handling Nested URLs

In Angular, both `navigate()` and `navigateByUrl()` are used for programmatic navigation. However, they differ in how they handle **nested URLs**.

## `navigate()`

- **Flexible**: Accepts an array of path segments, which can be used to navigate to both **relative** and **absolute** paths.
- **Best for nested routes**: When navigating between nested routes or building dynamic URLs, `navigate()` is more flexible as it allows you to build the path incrementally.

### Example

```typescript
this.router.navigate(['products', 'electronics', 'laptops']);  // Navigates to /products/electronics/laptops
```

- **Relative Navigation:** It can also be used for relative navigation (based on the current route).

#### Example for Relative Navigation

```typescript
this.router.navigate(['laptops'], { relativeTo: this.route });  // Relative to the current route
```

## navigateByUrl()

- **Absolute path only:** Takes a string representing the full URL. This is useful when you know the exact URL and want to navigate directly.
- **Less flexible for nested routes:** You must pass the entire URL, which means it's not suitable for relative or dynamically built paths.

### Code snippet

``` typescript
this.router.navigateByUrl('/products/electronics/laptops');  // Navigates to /products/electronics/laptops
```

## Key Differences

- **`navigate()`:** Suitable for nested routes and dynamic path construction, can handle relative and absolute URLs.
- **`navigateByUrl()`:** Only accepts an absolute URL, better when you have a pre-defined, full URL to navigate to.

> If you're working with nested routes or need relative path navigation, navigate() is the better choice.
{style="note"}

## Route Parameters

Passing and accessing route parameters can be done as follows:

### Configuring Route Parameters

```typescript
const routes: Routes = [
    { path: 'profile/:id', component: ProfileComponent }
];
```

### Accessing Route Parameters

```typescript
import { ActivatedRoute } from '@angular/router';

@Component({...})
export class ProfileComponent {
    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
        console.log(params['id']);  // Log the value of id
        });
    }
}
```

## Advanced Routing Techniques

### Guarding Routes
Use route guards to prevent access to routes based on certain conditions:

```typescript
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        // Your authentication logic here
        return true;
    }
}
```

### Lazy Loading
Configure your routes to load modules lazily to improve performance:

```typescript
const routes: Routes = [
    {
    path: 'features',
        loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
    }
];
```