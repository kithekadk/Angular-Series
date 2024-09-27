// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductNgrxService {
  private apiUrl = 'https://dummyjson.com/products'; // DummyJSON API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetch products from the DummyJSON API.
   * @returns {Observable<any[]>} - Observable containing the list of products.
   */
  getProducts(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.products) // Extract the products array from the response
    );
  }
}
