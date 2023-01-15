import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-food-modal',
  templateUrl: './add-food-modal.component.html',
  styleUrls: ['./add-food-modal.component.css']
})
export class AddFoodModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddFoodModalComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
