import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
}

export const backendPathUser = 'http://127.0.0.1:3000/';
export const backendPathFood = 'http://127.0.0.1:3001/';

