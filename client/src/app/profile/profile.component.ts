import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddWeightModalComponent } from '../add-weight-modal/add-weight-modal.component';

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
  public weightEntries: Array<any> = [];

  public weightEntriesX: Array<any> = [];	

  public chartOptions: any = {};
  public datapoints: any = [];

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

    this.auth.getWeightsForUser(this.token, this.currentUserId).subscribe(res => {
      console.log(res);
      for (let r of res) {
        this.weightEntries.push({date: new Date(r.createdAt), weight: parseInt(r.weight)});
        this.weightEntriesX.push({date: this.formatDate(new Date(r.createdAt)), weight: r.weight});
      }

      this.weightEntries = this.weightEntries.reverse();
      this.weightEntriesX = this.weightEntriesX.reverse();

      for (const weight of this.weightEntries) {
        this.datapoints.push({ x: weight.date, y: weight.weight })
      }

      this.chartOptions = {
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
          
          dataPoints: this.datapoints
        }]
      }
      this.currentWeight = this.weightEntries[this.weightEntries.length-1].weight;
    },
      error => {console.log(error)
    });

  }

  listInfoAboutMe() {
    this.auth.getUserInfo(this.token).subscribe(res => {
      console.log(res); 
      this.infoAboutMe = res;

      if (res.goal === 0) {
        this.goal = 'Lose Weight';
      } else if (res.goal === 1) {
        this.goal = 'Maintain';
      } else {
        this.goal = 'Gain Weight';
      }
      
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
    const dialogRef = this.dialog.open(AddWeightModalComponent, {
      height: '300px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
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
