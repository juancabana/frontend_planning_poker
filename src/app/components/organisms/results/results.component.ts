import { Component, Input } from '@angular/core';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent {
  @Input() cards_selected: any[] = [];
  average: number = 0;

  ngOnInit(): void {
    // Sacar el promedio
    let total = 0;
    this.cards_selected.forEach((card) => {
      total += card.value * card.amount;
    });
    this.average = total / this.cards_selected.length;
  }
  getAverageString(): string {
    return this.average.toLocaleString('es', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
