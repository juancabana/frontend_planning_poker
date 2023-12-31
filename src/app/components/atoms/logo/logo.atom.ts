import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.atom.html',
  styleUrls: ['./logo.atom.sass'],
})
export class LogoComponent {
  @Input() public isHome: boolean = false;
}
