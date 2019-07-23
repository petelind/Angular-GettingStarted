import { Component, OnInit } from '@angular/core';
import {IProduct} from './iproduct';

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
  constructor() {
    this.products = [
      {
        'productId': 1,
        'productName': 'Leaf Rake',
        'productCode': 'GDN-0011',
        'releaseDate': 'March 19, 2016',
        'description': 'Leaf rake with 48-inch wooden handle.',
        'price': 19.95,
        'starRating': 3.2,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png'
      },
      {
        'productId': 2,
        'productName': 'Garden Cart',
        'productCode': 'GDN-0023',
        'releaseDate': 'March 18, 2016',
        'description': '15 gallon capacity rolling garden cart',
        'price': 32.99,
        'starRating': 4.2,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
      },
      {
        'productId': 5,
        'productName': 'Hammer',
        'productCode': 'TBX-0048',
        'releaseDate': 'May 21, 2016',
        'description': 'Curved claw steel hammer',
        'price': 8.9,
        'starRating': 4.8,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
      },
      {
        'productId': 8,
        'productName': 'Saw',
        'productCode': 'TBX-0022',
        'releaseDate': 'May 15, 2016',
        'description': '15-inch steel blade hand saw',
        'price': 11.55,
        'starRating': 3.7,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png'
      },
      {
        'productId': 10,
        'productName': 'Video Game Controller',
        'productCode': 'GMG-0042',
        'releaseDate': 'October 15, 2015',
        'description': 'Standard two-button video game controller',
        'price': 35.95,
        'starRating': 4.6,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
      }
    ];
    this.filteredProducts = this.products;
    this.listFilter = 'leaf';
  }

  ngOnInit() {
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  private performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingChange($event: number, $product: IProduct) {
    $product.starRating = $event;
  }
}
