import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUserName!: string | null;
  public currentUserId!: string | null;
  public token!: string | null;
  public loggedIn: boolean = false;
  public hasGoalSet: boolean = false;
  public currentWeight!: any | null;
  public infoAboutMe!: any | null;
  public goal!: any | null;
  public name!: string | null;
  public age!: any | null;
  public height!: any | null;
  public kcal!: any | null;
  public weightEntries: Array<any> = [
    {date: new Date(2023, 0, 1), weight: 90.0},
    {date: new Date(2023, 0, 5), weight: 90.4},
    {date: new Date(2023, 1, 9), weight: 90.8},
    {date: new Date(2023, 1, 11), weight: 91.1},
    {date: new Date(2023, 2, 13), weight: 90.7},
    {date: new Date(2023, 3, 15), weight: 90.8},
    {date: new Date(2023, 4, 16), weight: 91.0},
    {date: new Date(2023, 5, 8), weight: 92.0},
  ];

  public weightEntriesX: Array<any> = [
    {date: this.formatDate(this.weightEntries[0].date), weight: 90.0},
    {date: this.formatDate(this.weightEntries[1].date), weight: 90.4},
    {date: this.formatDate(this.weightEntries[2].date), weight: 90.8},
    {date: this.formatDate(this.weightEntries[3].date), weight: 91.1},
    {date: this.formatDate(this.weightEntries[4].date), weight: 90.7},
    {date: this.formatDate(this.weightEntries[5].date), weight: 90.8},
    {date: this.formatDate(this.weightEntries[6].date), weight: 91.0},
    {date: this.formatDate(this.weightEntries[7].date), weight: 92.0},
  ];


  chartOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "Weight Progress - 2023"
		},
		axisX: {
			interval: 1
		},
		axisY: {
			title: "Kilograms",
		  suffix: " kg"
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: function(e: any){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else{
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
		data: [{
			type:"line",
			name: "Progress",
			showInLegend: true,
			yValueFormatString: "##.# kg",
			dataPoints: [		
				{ x: this.weightEntries[0].date, y: this.weightEntries[0].weight },
				{ x: this.weightEntries[1].date, y: this.weightEntries[1].weight },
				{ x: this.weightEntries[2].date, y: this.weightEntries[2].weight },
				{ x: this.weightEntries[3].date, y: this.weightEntries[3].weight },
				{ x: this.weightEntries[4].date, y: this.weightEntries[4].weight },
				{ x: this.weightEntries[5].date, y: this.weightEntries[5].weight },
				{ x: this.weightEntries[6].date, y: this.weightEntries[6].weight },
        { x: this.weightEntries[7].date, y: this.weightEntries[7].weight },
			]
		}]
	}	

  constructor(public auth: BackendApiService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('user_token');

    if (this.token) {
        this.loggedIn = true;
    }

    this.currentUserName = localStorage.getItem('user_name');
    this.currentUserId = localStorage.getItem('user_id');
    this.listInfoAboutMe();

    this.currentWeight = this.weightEntries[this.weightEntries.length-1].weight;
  }

  listInfoAboutMe() {
    this.auth.getUserInfo(this.token).subscribe(res => {
      console.log(res); 
      this.infoAboutMe = res;
      this.goal = 'Gain Weight';
      this.name = this.infoAboutMe["name"];
      this.age = this.infoAboutMe["age"];
      this.height = this.infoAboutMe["height"];
      this.kcal = this.infoAboutMe["kcalGoal"];
    },
      error => {console.log(error)
  });
  }

  addWeight(){
    console.log('adding weight');
  }

  changeGoal(){
    console.log('changing goal');
  }

  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }
  
  formatDate(date: any) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

}
