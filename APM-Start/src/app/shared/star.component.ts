import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges, OnInit {
  @Input() rating: number;
  starWidth: number;
  starSize = 75;

  private setRating() {
    this.starWidth = this.rating * this.starSize / 5;
  }

  ngOnInit(): void {
    this.setRating();
  }

  ngOnChanges(): void {
    this.setRating();
  }
}
