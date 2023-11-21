import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'header-room',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  urlActual: string = this.platformLocation.href;
  constructor(
    private clipboard: Clipboard,
    private platformLocation: PlatformLocation
  ) {}

  copyLink() {
    console.log(this.urlActual);
    this.clipboard.copy(this.urlActual);
  }
}
