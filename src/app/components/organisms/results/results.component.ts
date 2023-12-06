import { Component, Input, OnInit } from '@angular/core';
import { CardRevealed } from 'src/app/interfaces/card-revealed.interface';
import { CardSelected } from 'src/app/interfaces/card-selected.interface';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements OnInit {
  @Input() public cardsRevealed: CardRevealed[] = [];
  private average: number = 0;

  ngOnInit(): void {
    // Get average
    let total = 0;
    let amountCards = 0;
    this.cardsRevealed.forEach((card) => {
      if (card.value >= 0) {
        total += card.value * card.amount;
        amountCards += card.amount;
      }
    });
    this.average = (total / amountCards);
  }
  getAverageString(): string {
    return this.average.toLocaleString('es', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  isNumber(): boolean {
    return this.average >= 0;
  }
}
