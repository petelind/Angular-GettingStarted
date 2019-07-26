import { Component, OnInit } from '@angular/core';
import {IProduct} from './iproduct';
import {ProductService} from './product.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private errorMessage: string;
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
      error => this.errorMessage = error
    );
    if (this.errorMessage) { console.log('[ ERROR ]: Products module encountered an error during the init: ' + this.errorMessage); }
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
}
