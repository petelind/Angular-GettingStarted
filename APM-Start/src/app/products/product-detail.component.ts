import { Component, OnInit } from '@angular/core';
import {IProduct} from './iproduct';

@Component({
  // no selector because this component is always a part of the other component
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;

  constructor() { }

  ngOnInit() {
  }

}
