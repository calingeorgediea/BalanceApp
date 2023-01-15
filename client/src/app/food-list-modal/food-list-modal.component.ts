import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Food {
  name: string,
  calories: number
}

const food_example: Food[] = [
  {name: 'banana', calories: 44},
  {name: 'fries', calories: 500},
  {name: 'pancakes', calories: 420},
  {name: 'blueberry', calories: 30},
  {name: 'peach', calories: 60},
  {name: 'burger', calories: 600},
  {name: 'bread', calories: 100},
  {name: 'ice cream', calories: 225},
  {name: 'tomato', calories: 32},
  {name: 'mango', calories: 38},
  {name: 'pasta', calories: 350},
  {name: 'pork meat', calories: 300},
  {name: 'orange juice', calories: 100},
]

@Component({
  selector: 'app-food-list-modal',
  templateUrl: './food-list-modal.component.html',
  styleUrls: ['./food-list-modal.component.css']
})
export class FoodListModalComponent implements OnInit {
  displayedColumns: string[] = ['name', 'calories'];
  dataSource: any;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialogRef: MatDialogRef<FoodListModalComponent>) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(food_example.sort((a, b) => a.name.localeCompare(b.name)));
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClick() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
