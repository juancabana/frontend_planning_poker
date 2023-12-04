import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.sass'],
})
export class LogoComponent {
  @Input() public isHome: boolean = false;
}
