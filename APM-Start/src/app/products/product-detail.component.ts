import { Component, OnInit } from '@angular/core';
import {IProduct} from './iproduct';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from './product.service';

@Component({
  // no selector because this component is always a part of the other component
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | undefined;
  private error: string;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    let id: number;
    id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.error = error
    );
    if (this.error) { console.error(this.error); }

  }

}
