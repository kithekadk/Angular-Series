# Routing

Angular Routing plays a critical role in single-page applications by enabling navigation between different views or components without leaving the page. This guide covers all aspects of routing in Angular, including setup, route configuration, parameter passing, and guarding routes.

## Understanding Angular Routing

Angular's Router module enables the creation of rich, navigable applications. It interprets browser URLs as instructions to navigate to a client-generated view and passes optional parameters to support deep linking and navigation state.

## Setting Up Angular Routing

To use the Router, you need to set up routing in your Angular application:

### Import RouterModule
First, import `RouterModule` and `Routes` in your app module:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define your routes here
const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'about', component: AboutComponent }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}
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