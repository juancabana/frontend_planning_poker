import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass'],
  animations: [
    trigger('fadeInOut', [

      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class WelcomeComponent {
  @Input() public showWelcomeMessage = false;

}
