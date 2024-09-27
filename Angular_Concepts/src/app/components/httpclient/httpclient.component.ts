import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-httpclient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './httpclient.component.html',
  styleUrl: './httpclient.component.css'
})
export class HTTPClientComponent {
  public getData: any;
  public postData: any;
  public updateData: any;
  public deleteResponse: any;
  public errorMessage: string = '';

  constructor(private http: HttpClient) {}

  // GET request example
  fetchData() {
    this.http.get('https://dummyjson.com/products').subscribe(data => {
      this.getData = data;
      console.log('GET Data:', this.getData);
    });
  }

  // POST request example
  sendData() {
    const newItem = { name: 'New Product', description: 'This is a new product.' };
    this.http.post('https://dummyjson.com/products/add', newItem).subscribe(response => {
      this.postData = response;
      console.log('POST Response:', this.postData);
    });
  }

  // PUT request example
  updateDataItem() {
    const updatedItem = { name: 'Updated Product', description: 'This product has been updated.' };
    this.http.put('https://dummyjson.com/products/1', updatedItem).subscribe(response => {
      this.updateData = response;
      console.log('PUT Response:', this.updateData);
    });
  }

  // DELETE request example
  deleteDataItem() {
    this.http.delete('https://dummyjson.com/products/1').subscribe(response => {
      this.deleteResponse = response;
      console.log('DELETE Response:', this.deleteResponse);
    });
  }

  // GET request with Query Parameters
  fetchWithParams() {
    const params = new HttpParams().set('limit', '5').set('skip', '10');
    this.http.get('https://dummyjson.com/products', { params }).subscribe(data => {
      this.getData = data;
      console.log('GET with Params:', this.getData);
    });
  }

  // GET request with custom Headers
  fetchWithHeaders() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer your-token')
      .set('Custom-Header', 'custom-value');
    this.http.get('https://dummyjson.com/products', { headers }).subscribe(data => {
      this.getData = data;
      console.log('GET with Headers:', this.getData);
    });
  }

  // Error handling example
  fetchWithErrorHandling() {
    this.http
      .get('https://dummyjson.com/products/nonexistent-endpoint')
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error fetching data!';
          console.error('Error occurred:', error);
          return throwError(() => new Error('Something went wrong!'));
        })
      )
      .subscribe({
        next: data => console.log(data),
        error: err => console.log('Error:', err)
      });
  }
}
