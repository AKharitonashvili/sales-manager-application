import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@app/shared/models/products/products.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = 'http://localhost:8000/api/products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  addProduct(product: Product): Observable<Product[]> {
    return this.http
      .post<any>(this.url, product)
      .pipe(map((v) => ({ ...v, id: v._id })));
  }

  editProduct(product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(this.url + '/' + product.id, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
