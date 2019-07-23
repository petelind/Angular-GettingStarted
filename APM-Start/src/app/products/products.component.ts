import { Component, OnInit } from '@angular/core';
import {IProduct} from './iproduct';
import {ProductService} from './product.service';

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
  products: IProduct[];
  filteredProducts: IProduct[];
  private _listFilter: string;
  private _productService: ProductService;
  constructor(productService: ProductService) {
    this._productService = productService;
  }

  ngOnInit() {
    this.products = this._productService.getProducts();
    this.filteredProducts = this.products;
    this.listFilter = '';
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  private performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingChange($event: number, $product: IProduct) {
    this._productService.updateProductRating($product.productId, $event);
    this.products = this._productService.getProducts();
  }
}
