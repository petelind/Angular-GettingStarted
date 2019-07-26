import { Injectable } from '@angular/core';
import {IProduct} from './iproduct';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: 'http://localhost:4200/api/products/products.json';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    let dataSource = this.http.get<IProduct[]>('http://localhost:4200/api/products/products.json');
    return dataSource;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // this is client-side error, inform the client so he can straighten himself up
      errorMessage = 'You have an error on your side: ' + err.error.message;
    } else {
      // that we screwed up, lets at least inform app monitoring service
      errorMessage = '[ ERROR ] Server returned code: ' + err.status + ', message was: ' + err.statusText + '(' + err.message + ')' ;
      console.error(errorMessage);
      // NEVER EVER RE-THROW! thats here just because we dont do anything meaningful!
      return throwError(errorMessage);
    }
  }

}
