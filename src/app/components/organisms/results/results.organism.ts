import { Component, Input, OnInit } from '@angular/core';
import { CardRevealed } from '../../../interfaces/card-revealed.interface';

@Component({
  selector: 'results',
  templateUrl: './results.organism.html',
  styleUrls: ['./results.organism.sass'],
})
export class ResultsComponent implements OnInit {
  @Input() public cardsRevealed: CardRevealed[] = [];
  public average: number = 0;

  ngOnInit(): void {
    this.setAverage();
  }

  setAverage() {
    let total = 0;
    let amountCards = 0;
    this.cardsRevealed.forEach((card) => {
      if (card.value >= 0) {
        total += card.value * card.amount;
        amountCards += card.amount;
      }
    });
    this.average = total / amountCards;
  }

  getAverageString(): string {
    return this.average.toLocaleString('es', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  isNumber(): boolean {
    return this.average >= 0;
  }
}
