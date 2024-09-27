// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/utils/page-not-found/page-not-found.component';
import { AdminComponent } from './components/utils/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './components/utils/about/about.component';
import { ProfileComponent } from './components/utils/profile/profile.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'concepts/:topic', loadComponent: () => import('./components/concept/concept.component').then(m => m.ConceptComponent), children: [
    {
      path: 'cart',
      loadComponent: () => import('./components/utils/cart/cart.component').then(m => m.CartComponent)
    },
    {
      path: 'products',
      loadComponent: () => import('./components/utils/product-list/product-list.component').then(m => m.ProductListComponent)
    }
  ]}, // Lazy loading concept components
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'about', component: AboutComponent },
  { path: 'profile/:id', component: ProfileComponent }, // Route with parameter
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
