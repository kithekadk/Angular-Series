# Angular Universal

**Angular Universal** enables **Server-Side Rendering (SSR)** for Angular applications, which improves performance, search engine optimization (SEO), and initial loading speed. With Angular 18, the Angular ecosystem has embraced **standalone components**, allowing developers to skip the use of Angular modules and create more streamlined applications.

## What is Angular Universal?

Angular Universal allows you to render Angular applications on the server and send the rendered HTML to the client instead of rendering everything in the browser. This enhances the user experience, especially on slower networks or lower-powered devices, as the server pre-renders the content and sends it to the browser. The client-side JavaScript then hydrates and attaches to the pre-rendered HTML, allowing Angular's interactivity to kick in.

**Benefits of Angular Universal**:
- **SEO Improvements**: Search engine bots can index your pre-rendered HTML pages more effectively.
- **Faster Initial Load Times**: HTML content is sent to the client immediately, reducing the time it takes for users to see content.
- **Improved User Experience**: Users on slower networks or older devices experience faster load times since the heavy lifting is done server-side.

---

## Installing Angular Universal

To add Angular Universal support to your Angular 18 project with standalone components, you need to add the `@nguniversal/express-engine` package. This package includes everything required to render Angular components on the server using **Express.js**.

```bash
ng add @nguniversal/express-engine
```

> When you create a new Angular application using the `ng new` command, you have the option to enable or disable **SSR (Server-Side Rendering)** during the setup process. If you enable SSR, **Angular Universal** will automatically be configured for your project. If you disable it, you can still add SSR later using the command above.
{style="note"} 

This command sets up your project with Angular Universal by:

- Installing the required packages.
- Configuring a `Node.js` server using `Express.js`.
- Adding server-side rendering files like `server.ts` and `app.server.module.ts`.

## App Structure with Standalone Components
Angular 18 introduced standalone components, which simplifies the architecture by removing the need for NgModules. Let’s walk through configuring your application with Angular Universal using standalone components.

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
selector: 'app-root',
standalone: true,
imports: [RouterOutlet],
template: `
    <nav class="nav-bar">
      <a routerLink="/">Home</a>
      <a routerLink="/about">About Us</a>
    </nav>
    <router-outlet></router-outlet>
  `,
styles: [`
    .nav-bar {
      display: flex;
      justify-content: space-around;
      background-color: green;
      padding: 15px;
    }
    a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
  `]
})
export class AppComponent {}
```

In this standalone component, the `AppComponent` serves as the root of the application. Notice that we import `RouterOutlet` directly into the imports array, which removes the need for modules.


## Configure `AppServer`for Standalone Components
Since standalone components don’t require traditional modules, the `AppServerModule` will look slightly different. We import the components directly into this module.

#### app.server.module.ts

```typescript
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';

@NgModule({
imports: [
ServerModule,
RouterModule.forRoot(routes), // Adding routes for SSR
],
bootstrap: [AppComponent],
})
export class AppServerModule {}
```

## Server-Side Rendering Configuration
After adding Angular Universal, a new `server.ts `file is generated. This file configures the Express.js server that handles incoming requests and serves the pre-rendered HTML from the Angular application.

### server.ts

```typescript
import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { AppServerModule } from './src/main.server';

const app = express();
const distFolder = join(process.cwd(), 'dist/angular-universal-demo/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

app.engine('html', ngExpressEngine({
bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', distFolder);

// Static assets
app.get('*.*', express.static(distFolder, { maxAge: '1y' }));

// All other routes render the Angular Universal HTML
app.get('*', (req, res) => {
res.render(indexHtml, { req });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
console.log(`Node Express server listening on http://localhost:${port}`);
});
```

This file contains the Express.js setup that:

- Loads static files (e.g., CSS, JS, images).
- Renders Angular components on the server using the `ngExpressEngine`.
- Handles all other routes by sending the server-rendered HTML to the client.

## Standalone Components and Angular Universal
Angular 18's standalone components remove the need for traditional Angular modules, but they are fully compatible with Angular Universal. You can use standalone components without needing to declare them in any NgModule.

#### Home Component Example

```typescript
import { Component } from '@angular/core';

@Component({
selector: 'app-home',
standalone: true,
template: `
    <h1>Welcome to Angular Universal with Standalone Components</h1>
    <p>This content is server-side rendered.</p>
  `
})
export class HomeComponent {}
```

## About Component with Server-Side Data Fetching
Server-side rendering involves handling HTTP requests on the server. Let's integrate HTTP Client and TransferState to avoid redundant requests on the client-side.

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const ABOUT_DATA_KEY = makeStateKey<string>('aboutData');

@Component({
selector: 'app-about',
standalone: true,
template: `
    <h2>About Us</h2>
    <p>{{ aboutInfo }}</p>
  `
})
export class AboutComponent implements OnInit {
    aboutInfo: string = '';
    
    constructor(private http: HttpClient, private state: TransferState) {}
    
    ngOnInit() {
        const storedData = this.state.get(ABOUT_DATA_KEY, null);
        if (storedData) {
            this.aboutInfo = storedData;
        } else {
            this.http.get('https://dummyjson.com/products/1').subscribe((data: any) => {
            this.aboutInfo = `Product: ${data.title}`;
            this.state.set(ABOUT_DATA_KEY, this.aboutInfo);
            });
    }
}
}
```

In this AboutComponent, the TransferState service is used to cache server-side data, preventing repeated API requests when the page is hydrated on the client.

**Here’s how it works:**

- The TransferState mechanism checks if the data is available from the server-side rendered content.
- If it’s available, it avoids making another HTTP request.
- If not, it makes the request and stores the response.

## Routing with Standalone Components and Angular Universal
Routing is essential for Angular Universal applications, especially for SEO. You can define routes with standalone components as you would with module-based components.

### app.routes.ts

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

export const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'about', component: AboutComponent },
];
```

## TransferState in Angular Universal
One of the key techniques in Angular Universal is using TransferState. This service ensures that data fetched on the server is not `refetched` on the client, reducing redundant API calls and improving performance.

#### TransferState Example in AboutComponent
The `AboutComponent` example above uses TransferState to:

Fetch product information on the server.
- Transfer the fetched data to the client when `Angular hydrates` the application.
- Prevent the client from making the same API request again.
- Hydration and Client-Side Rehydration
- Once the server has rendered the Angular application and sent the HTML to the client, Angular rehydrates the page by attaching `client-side` JavaScript to the `pre-rendered HTML`. 
  - This process allows the user to see the fully rendered page as soon as possible, while Angular's dynamic interactivity takes over when the client-side scripts are loaded.

## Build and Run the Application

**Build the client-side application**

```bash
npm run build
```

**Build the server-side application**

```bash
npm run build:ssr
```

**Serve the Angular Universal application**

```bash
npm run serve:ssr
```

Your application is now running with server-side rendering at `http://localhost:4000`.


## Caching and Performance Optimization
When using Angular Universal, always aim to:

- **Cache static assets** (e.g., CSS, JS) using a long max-age setting in Express.
- Use **TransferState** to avoid duplicate API requests.
- **Lazy load** routes and modules to minimize the initial server-side bundle size.