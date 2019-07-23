import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges, OnInit {
  @Input() rating: number;
  starWidth: number;
  starSize = 75;
  @Output() ratingChanged: EventEmitter<number> = new EventEmitter();

  private setRatingBoxSize() {
    this.starWidth = this.rating * this.starSize / 5;
  }

  ngOnInit(): void {
    this.setRatingBoxSize();
  }

  ngOnChanges(): void {
    this.setRatingBoxSize();
  }

  onClick(): void {
    this.rating = this.rating + 1;
    if (this.rating > 5) { this.rating = 1; }
    this.setRatingBoxSize();
    this.ratingChanged.emit(this.rating);
  }
}
