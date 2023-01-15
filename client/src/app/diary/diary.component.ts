import { OnInit, Component } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FoodListModalComponent } from '../food-list-modal/food-list-modal.component';

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
  public goal = 0;
  public totalCaloriesBreakfast = 0;
  public totalCaloriesLunch = 0;
  public totalCaloriesDinner = 0;
  public totalCaloriesSnacks = 0;
  public totalCaloriesExercises = 0;
  public totalCalories = 0;
  public remainingCalories = 0;
  public foodBreakfast: Array<any> = [
    {name: 'food1 breakfast', quantity: 1, calories: 100},
    {name: 'food2 breakfast', quantity: 3, calories: 300},
    {name: 'food3 breakfast', quantity: 0.5, calories: 250},
  ];
  public foodLunch: Array<any> = [
    {name: 'food1 lunch', quantity: 2, calories: 123},
    {name: 'food2 lunch', quantity: 2.1, calories: 153},
    {name: 'food3 lunch', quantity: 1.5, calories: 612},
  ];
  public foodDinner: Array<any> = [
    {name: 'food1 dinner', quantity: 1.4, calories: 313},
    {name: 'food2 dinner', quantity: 2.3, calories: 222},
    {name: 'food3 dinner', quantity: 1.5, calories: 131},
  ];
  public foodSnacks: Array<any> = [
    {name: 'food1 snack', quantity: 3, calories: 442},
    {name: 'food2 snack', quantity: 1, calories: 93},
    {name: 'food3 snack', quantity: 1.5, calories: 20},
  ];
  public exercises: Array<any> = [
    {name: 'push-up', quantity: 100, calories: 60},
    {name: 'squat', quantity: 50, calories: 100},
    {name: 'deadlift', quantity: 30, calories: 150},
  ];

  constructor(
    public auth: BackendApiService,
    public dialog: MatDialog
  ) { }

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
      this.goal = 0;
      this.totalCaloriesBreakfast = 0;
      this.totalCaloriesLunch = 0;
      this.totalCaloriesDinner = 0;
      this.totalCaloriesSnacks = 0;
      this.totalCaloriesExercises = 0;
      this.totalCalories = 0;
      this.remainingCalories = 0;
      this.goal = this.infoAboutMe["kcalGoal"];
      for(let i = 0; i < this.foodBreakfast.length; i++){
        this.totalCaloriesBreakfast += this.foodBreakfast[i].calories;
      }
      for(let i = 0; i < this.foodLunch.length; i++){
        this.totalCaloriesLunch += this.foodLunch[i].calories;
      }
      for(let i = 0; i < this.foodDinner.length; i++){
        this.totalCaloriesDinner += this.foodDinner[i].calories;
      }
      for(let i = 0; i < this.foodSnacks.length; i++){
        this.totalCaloriesSnacks += this.foodSnacks[i].calories;
      }
      for(let i = 0; i < this.exercises.length; i++){
        this.totalCaloriesExercises += this.exercises[i].calories;
      }
      this.totalCalories = this.totalCaloriesBreakfast + this.totalCaloriesLunch + this.totalCaloriesDinner + this.totalCaloriesSnacks + this.totalCaloriesExercises;
      this.remainingCalories = this.goal - this.totalCalories + this.totalCaloriesExercises;
    },
      error => {console.log(error)
  });
  }

  addFoodToBreakfast(){
    console.log('Adding food to breakfast');
    console.log();
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

  removeFoodBreakfast(i: any){
    if (i > -1){
      this.foodBreakfast.splice(i, 1);
      this.listInfoAboutMe();
    }
  }

  removeFoodLunch(i: any){
    if (i > -1){
      this.foodLunch.splice(i, 1);
      this.listInfoAboutMe();
    }
  }

  removeFoodDinner(i: any){
    if (i > -1){
      this.foodDinner.splice(i, 1);
      this.listInfoAboutMe();
    }
  }

  removeFoodSnack(i: any){
    if (i > -1){
      this.foodSnacks.splice(i, 1);
      this.listInfoAboutMe();
    };
  }

  removeExercise(i: any){
    if (i > -1){
      this.exercises.splice(i, 1);
      this.listInfoAboutMe();
    }
  }

  openFoodListDialog() {
    const dialogRef = this.dialog.open(FoodListModalComponent, {
      height: '550px',
      width: '700px',
      backdropClass: 'dialog-content'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

}
