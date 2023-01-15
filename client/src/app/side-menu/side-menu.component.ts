import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private backendApiService: BackendApiService) { }

  ngOnInit(): void {
  }

  logout() {
    this.backendApiService.logout('');
  }

}
