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
  public date: Date = new Date;
  public goal = 0;
  public totalCaloriesBreakfast = 0;
  public totalCaloriesLunch = 0;
  public totalCaloriesDinner = 0;
  public totalCaloriesSnacks = 0;
  public totalCaloriesExercises = 0;
  public totalCalories = 0;
  public remainingCalories = 0;

  public foodBreakfast: Array<any> = []  ;
  public foodLunch: Array<any> = [];
  public foodDinner: Array<any> = [];
  public foodSnacks: Array<any> = [];
  public exercises: Array<any> = [];

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

    let todaysDate = this.date.toJSON().slice(0, 10);
    this.initData(todaysDate);
  }

  initData(todaysDate: any) {
    this.foodBreakfast = [];
    this.foodLunch = [];
    this.foodDinner = [];
    this.foodSnacks = [];
    this.exercises = [];

    this.auth.getAllFoodsFromDiaryOneDay(this.token, todaysDate).subscribe(res => {
      console.log(res);

      for (let r of res) {
        if (r.when === 'breakfast') {
          this.foodBreakfast.push({name: r.name, calories: r.kcal / 100 * r.qty});
        } else if (r.when === 'lunch') {
          this.foodLunch.push({name: r.name, calories: r.kcal / 100 * r.qty});
        } else if (r.when === 'dinner') {
          this.foodDinner.push({name: r.name, calories: r.kcal / 100 * r.qty});
        } else if (r.when === 'snacks') {
          this.foodSnacks.push({name: r.name, calories: r.kcal / 100 * r.qty});
        } else if (r.when === 'exercise') {
          this.exercises.push({name: r.name, calories: r.kcal});
        }
      }
      this.listInfoAboutMe();
    }, error => {console.log(error)});
  }

  listInfoAboutMe() {
    this.auth.getUserInfo(this.token).subscribe(res => {
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
      this.totalCalories = this.totalCaloriesBreakfast + this.totalCaloriesLunch + this.totalCaloriesDinner + this.totalCaloriesSnacks;
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

  openFoodListDialog(when: string) {
    const dialogRef = this.dialog.open(FoodListModalComponent, {
      height: '550px',
      width: '700px',
      data: {
        when: when ? when : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('intra')
      if (result) {

      }
    });
  }

  handleDateChange(e: any) {
    this.initData(e.value);
  }

}
