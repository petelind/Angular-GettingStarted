import { Component, OnInit } from '@angular/core';
import {IProduct} from './iproduct';
import {ProductService} from './product.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  get listFilter(): string {
    return this._listFilter;
   }
  set listFilter(value: string) {
    this._listFilter = value;
    // if there is something in the filter - call the func to filter, otherwise let it be...
    this.filteredProducts = this.listFilter ? this.performFilter(this._listFilter) : this.products;
  }
  pageTitle = 'Product List';
  imageWidth = 50;
  imageHeight = 50;
  imageMargin = 2;
  showImage = false;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  private _listFilter: string;
  constructor(private productService: ProductService, private http: HttpClient) {
    this.listFilter = '';
  }

  ngOnInit(): void {
    let dataSource = this.productService.getProducts();
    dataSource.subscribe(
      products => {
        this.products = products;
          this.filteredProducts = this.products;
      },
      error => this.handleError(error)
    );

  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  private performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingChange($event: number, $product: IProduct) {
    console.log('Rating changed for the ' + $product.productId);
  }

  private handleError(err: any) {
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
