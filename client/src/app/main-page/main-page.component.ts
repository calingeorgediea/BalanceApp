import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  public currentUserName!: string | null;
  public currentUserId!: string | null;
  public token!: string | null;
  public infoAboutMe!: any | null;
  public loggedIn: boolean = false;
  public hasGoalSet: boolean = false;
  public formError: boolean = false;
  public kcalGoal!: string | null;

  public caloriesConsumed: number = 0;
  public goalPercentage: number = 0;
  public remainingCals: number = 0;

  constructor(public auth: BackendApiService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('user_token');

    if (this.token) {
        this.loggedIn = true;
    }

    this.currentUserName = localStorage.getItem('user_name');
    this.currentUserId = localStorage.getItem('user_id');

    this.auth.getUserInfo(this.token).subscribe(res => {
      console.log(res);
      this.hasGoalSet = res.kcalGoal === 0 ? false : true;
      this.kcalGoal = res.kcalGoal;
      this.goalPercentage = this.caloriesConsumed * 100 / parseInt(this.kcalGoal!);
      this.remainingCals = parseInt(this.kcalGoal!) - this.caloriesConsumed
    }, error => {console.log(error)});
  }

  handleClickSet() {
    this.formError = false;

    let weight =  (<HTMLInputElement>document.getElementById("weight"))!.value;
    let height =  (<HTMLInputElement>document.getElementById("height"))!.value;
    let age =  (<HTMLInputElement>document.getElementById("age"))!.value;
    let gender =  (<HTMLInputElement>document.getElementById("gender"))!.value;
    let goal =  (<HTMLInputElement>document.getElementById("goal"))!.value;
    let activity_level =  (<HTMLInputElement>document.getElementById("activity"))!.value;

    if (weight === '' || age === '' || height === '' ||
        gender === '-1' || goal === '-1' || activity_level === '-1' ||
        weight.match(/^[0-9]+$/) === null || age.match(/^[0-9]+$/) === null || height.match(/^[0-9]+$/) === null)  {
      this.formError = true;
      return;
    }

    this.auth.getKcalGoal(this.token, age, weight, height, activity_level, gender, goal).subscribe(res => {
      console.log(res);
      this.kcalGoal = res.result;

      this.auth.updateUserInfo(this.token, age, weight, height, activity_level, gender, goal, this.kcalGoal).subscribe(res => {
        console.log(res);

        this.auth.addWeightEntry(this.token, weight, this.currentUserId).subscribe(res => {
          console.log(res);
          window.location.reload();
        }, error => {console.log(error); return;});

      }, error => {console.log(error); return;});

    }, error => {console.log(error); return;});

  }
}
