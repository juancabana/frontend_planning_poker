import { Component, Input } from '@angular/core';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent {
  @Input() cards_selected: any[] = [];
}
