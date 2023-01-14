import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  public currentUserName!: string | null;
  public currentUserId!: string | null;
  public token!: string | null;
  public infoAboutMe!: any | null;
  public loggedIn: boolean = false;

  constructor(public auth: BackendApiService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('user_token');

    if (this.token) {
        this.loggedIn = true;
    }

    this.currentUserName = localStorage.getItem('user_name');
    this.currentUserId = localStorage.getItem('user_id');
    this.listInfoAboutMe();
  }

  listInfoAboutMe() {
    this.auth.listInfoAboutMe(this.token).subscribe(res => {
      console.log(res); 
      this.infoAboutMe = res;
    },
      error => {console.log(error)
  });
  }

}
