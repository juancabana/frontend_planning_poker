import { Component, Input, OnInit } from '@angular/core';
import { CardRevealed } from '../../../../interfaces/card-revealed.interface';

@Component({
  selector: 'results',
  templateUrl: './results.organism.html',
  styleUrls: ['./results.organism.sass'],
})
export class ResultsComponent implements OnInit {
  public average: number = 0;

  @Input() public cardsRevealed: CardRevealed[] = [];

  ngOnInit(): void {
    this.setAverage();
  }

  setAverage(): void {
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

}
