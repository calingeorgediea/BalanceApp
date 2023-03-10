import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddFoodModalComponent } from '../add-food-modal/add-food-modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendApiService } from '../services/backend-api.service';

export interface Food {
  name: string,
  calories: number,
  id: string
}

// const food_example: Food[] = [
//   {name: 'banana', calories: 44},
//   {name: 'fries', calories: 500},
//   {name: 'pancakes', calories: 420},
//   {name: 'blueberry', calories: 30},
//   {name: 'peach', calories: 60},
//   {name: 'burger', calories: 600},
//   {name: 'bread', calories: 100},
//   {name: 'ice cream', calories: 225},
//   {name: 'tomato', calories: 32},
//   {name: 'mango', calories: 38},
//   {name: 'pasta', calories: 350},
//   {name: 'pork meat', calories: 300},
//   {name: 'orange juice', calories: 100},
// ]

@Component({
  selector: 'app-food-list-modal',
  templateUrl: './food-list-modal.component.html',
  styleUrls: ['./food-list-modal.component.css']
})
export class FoodListModalComponent implements OnInit {
  displayedColumns: string[] = ['name', 'calories'];
  dataSource: any;
  activatedRow = null;
  token!: string | null;
  food_example: Food[] = [];

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private selectFoodDialogRef: MatDialogRef<FoodListModalComponent>,
    public auth: BackendApiService,
    private addFoodDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {

    console.log(this.data);

    this.token = localStorage.getItem('user_token');
    this.auth.getAllFoods(this.token).subscribe(res => {
      console.log(res);
      for(let r of res) {
        if (r.category !== 'sport') {
          this.food_example.push({name: r.name, calories: r.kcal, id: r._id});
        }
      }
      this.dataSource = new MatTableDataSource(this.food_example.sort((a, b) => a.name.localeCompare(b.name)));
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.dataSource.sort = this.sort;
    }, error => {console.log(error)});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clickRow(row: any) {
    this.activatedRow = row;
    this.openDialog(row);
  }

  openDialog(row: any) {
    const dialogRef = this.addFoodDialog.open(AddFoodModalComponent, {
      height: '550px',
      width: '700px',
      data:  {
        name: row ? row.name : null,
        calories: row ? row.calories : null,
        when: this.data ? this.data.when : null,
        id: row ? row.id : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result.foodId);
        if (!result.foodId) {
          this.auth.addFood(this.token, result.data.name, 'description', result.data.calories, 'food').subscribe(res => {
            console.log(res);
            this.auth.addFoodInDiary(this.token, result.data.when, result.data.quantity, res.food._id).subscribe(res => {
              console.log(res);
              window.location.reload();
            }, error => {console.log(error)});

          }, error => {console.log(error)});
        } else {
            this.auth.addFoodInDiary(this.token, result.data.when, result.data.quantity, result.foodId).subscribe(res => {
              console.log(res);
              window.location.reload();
            }, error => {console.log(error)});
        }

        this.selectFoodDialogRef.close();
      }
    });
  }

  onClick() {
    
  }

  onNoClick(): void {
    this.selectFoodDialogRef.close();
  }
}
