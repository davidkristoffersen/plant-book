import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Plant book for dualog';

  constructor(private router: Router) {}

  getLocation() {
    return this.router.url;
  }
}
