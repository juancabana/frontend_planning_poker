import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('fadeInOut', [

      transition(':leave', [
        animate(700, style({ opacity: 0 }))
      ])
    ])
  ]

})
export class AppComponent implements OnInit {
  title = 'Planning Poker';
  showWelcomeMessage = true;


  ngOnInit(): void {
    setTimeout(() => {
      this.closeWelcomeMessage();
    }, 1000);

  }
  closeWelcomeMessage() {
    this.showWelcomeMessage = false;
  }
}
