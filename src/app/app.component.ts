import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
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
