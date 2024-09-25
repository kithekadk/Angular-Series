# HTTP Client

The `HttpClient` is a powerful service provided by Angular to perform HTTP requests. It allows you to communicate with a remote server over the HTTP protocol and is built on top of the browser's native `XMLHttpRequest` object or the `Fetch` API.

### Importing `HttpClientModule`

To use `HttpClient` in Angular, you first need to import the `HttpClientModule` in your application's root module.

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    // other modules
  ],
})
export class AppModule { }
```

> Without importing HttpClientModule, the HttpClient service will not be available for use in your Angular application.
{style="note"}

### Basic HttpClient Usage
Once HttpClientModule is imported, you can inject HttpClient into your services or components to start making HTTP requests.

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://api.example.com/data');
  }
}
```

> The HttpClient methods (get, post, put, etc.) return Observables, so you must subscribe to them in order to receive the data.
{style="note"}

## HTTP Methods
Angular's HttpClient supports the following HTTP methods:

- **GET:** Fetch data from the server.
- **POST:** Send data to the server.
- **PUT:** Update existing data on the server.
- **DELETE:** Remove data from the server.

Each of these methods can be called directly on the HttpClient instance.

## Making GET Requests
A GET request is used to fetch data from the server. Here's how to perform a simple GET request with HttpClient:

```typescript
this.http.get('https://api.example.com/items').subscribe(data => {
  console.log(data);
});
```

> **Important:** Always handle errors in your HTTP requests to ensure a smooth user experience in case of failures.
{style="important"}

## Making POST Requests
A POST request is used to send data to the server. Typically, POST is used when you want to create a new resource on the server.

```typescript
const newItem = { name: 'New Item', description: 'This is a new item.' };

this.http.post('https://api.example.com/items', newItem)
  .subscribe(response => {
    console.log(response);
  });
```

> You can send any JavaScript object in the body of a POST request. The server should be set up to handle the incoming JSON data.
{style="note"}

## Making PUT Requests
PUT requests are used to update an existing resource on the server. You need to pass the updated object and the resource identifier.

```typescript
const updatedItem = { name: 'Updated Item', description: 'This item has been updated.' };

this.http.put('https://api.example.com/items/1', updatedItem)
  .subscribe(response => {
    console.log('Updated item:', response);
  });
```
{style="tip"}
> **Tip:** Use PUT when you want to completely replace the resource, and PATCH when you want to update a part of it.


## Making DELETE Requests

A DELETE request is used to remove a resource from the server.

```typescript
this.http.delete('https://api.example.com/items/1')
  .subscribe(response => {
    console.log('Deleted:', response);
  });
```

> Be cautious when using DELETE requests. Make sure you are deleting the correct resource, as DELETE operations are usually irreversible.
{style="warning"}

## Handling HTTP Parameters

You can send query parameters in your requests by using `HttpParams`.

```typescript
import { HttpParams } from '@angular/common/http';

const params = new HttpParams()
  .set('page', '1')
  .set('pageSize', '10');

this.http.get('https://api.example.com/items', { params })
  .subscribe(data => {
    console.log('Paginated items:', data);
  });
```

> HttpParams is immutable, meaning each call to .set() returns a new instance. Make sure to chain the calls as shown above.
{style="note"}

## Headers in HTTP Requests

You can send custom headers along with your requests using the `HttpHeaders` class.

```typescript
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
  .set('Authorization', 'Bearer your-token')
  .set('Custom-Header', 'custom-value');

this.http.get('https://api.example.com/protected-items', { headers })
  .subscribe(data => {
    console.log('Protected items:', data);
  });
```

{style="tip"} 
> **Tip:** Use headers for things like authentication tokens or metadata that need to be passed along with your HTTP request.


## Error Handling in HttpClient

Handling errors in HTTP requests is crucial to avoid unexpected behavior in your application. You can use RxJS's `catchError` operator to manage errors.

```typescript
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

this.http.get('https://api.example.com/nonexistent-endpoint')
  .pipe(
    catchError(error => {
      console.error('Error occurred:', error);
      return throwError('Something went wrong!');
    })
  )
  .subscribe(
    data => console.log(data),
    error => console.log(error)
  );
```

{style="important"} 
> **Important:** Always handle errors to provide feedback to the user and log errors appropriately for debugging and analytics purposes.


## HTTP Interceptors

HTTP interceptors allow you to intercept and modify HTTP requests before they are sent or responses before they are processed by your application. Common use cases include adding authentication tokens or logging requests.

### Creating an Interceptor

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authReq);
  }
}
```

### Registering the Interceptor
To use the interceptor, you need to provide it in the providers array of your Angular module.

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule { }
```

> The `multi: true` option allows multiple interceptors to be registered and run in sequence.
{style="note"}


## Observables and HttpClient

Angular's `HttpClient` returns Observables for all HTTP requests. Observables are a powerful way to handle asynchronous data streams, and you can use RxJS operators like `map()`, `catchError()`, `tap()`, and others to manipulate the data returned from an HTTP request.

```typescript
import { map, catchError } from 'rxjs/operators';

this.http.get('https://api.example.com/items')
  .pipe(
    map(items => items.filter(item => item.active)),
    catchError(error => {
      console.error('Error occurred:', error);
      return throwError(error);
    })
  )
  .subscribe(data => {
    console.log('Active items:', data);
  });
```

{style="tip"} 
> **Tip:** You can chain multiple RxJS operators to manipulate data returned by HTTP requests.


### JSON Placeholder Example (Real-World Usage)

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.apiUrl);
  }

  getPostById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPost(post: { title: string, body: string }) {
    return this.http.post(this.apiUrl, post);
  }

  updatePost(id: number, post: { title: string, body: string }) {
    return this.http.put(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

This service uses HttpClient to interact with a real-world API (jsonplaceholder.typicode.com), which provides sample data for testing HTTP requests.