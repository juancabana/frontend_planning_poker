import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.sass'],
  animations: [
    trigger('fadeInOut', [
      transition(':leave', [animate(500, style({ opacity: 0 }))]),
    ]),
  ],
})
export class HomeComponent {
  showWelcomeMessage = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.showWelcomeMessage = false;
    }, 1000);
  }

}
