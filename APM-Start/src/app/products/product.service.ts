import {Injectable} from '@angular/core';
import {IProduct} from './iproduct';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: string = '/api/products/products.json';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl);
  }

  getProduct(id: number): Observable<IProduct> {
    let productSource: Observable<IProduct>;
    productSource = this.getProducts().pipe(
      map((products: IProduct[]) => products.find(p => p.productId === id))
    );
    return productSource;
  }
}
