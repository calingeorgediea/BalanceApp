import { OnInit, Component } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
  public goal!: string | null;

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
      this.goal = this.infoAboutMe["kcalGoal"];
    },
      error => {console.log(error)
  });
  }

  addFoodToBreakfast(){
    console.log('Adding food to breakfast');
  }

  addFoodToLunch(){
    console.log('Adding food to lunch');
  }

  addFoodToDinner(){
    console.log('Adding food to dinner');
  }

  addFoodToSnacks(){
    console.log('Adding food to snacks');
  }

  addExercise(){
    console.log('Adding exercise');
  }

  removeFood(){
    console.log('Removing food entry')
  }

}
