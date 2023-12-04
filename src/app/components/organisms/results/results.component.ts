import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements OnInit {
  @Input() public cardsSelected: any[] = [];
  private average: number = 0;

  ngOnInit(): void {
    // Get average
    let total = 0;
    let amountCards = 0;
    this.cardsSelected.forEach((card) => {
      total += card.value * card.amount;
      amountCards += card.amount;
    });
    this.average = (total / amountCards);
  }
  getAverageString(): string {
    return this.average.toLocaleString('es', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
