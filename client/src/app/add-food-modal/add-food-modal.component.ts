import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-food-modal',
  templateUrl: './add-food-modal.component.html',
  styleUrls: ['./add-food-modal.component.css']
})
export class AddFoodModalComponent implements OnInit {
  form: FormGroup;
  foodId: string | null;

  constructor(
    private dialogRef: MatDialogRef<AddFoodModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      this.form = new FormGroup({
        name: new FormControl(data != null ? data.name : null, Validators.compose([Validators.required])),
        when: new FormControl(data != null ? data.when : null, Validators.compose([Validators.required])),
        calories: new FormControl(data != null ? data.calories : null, Validators.compose([Validators.required])),
        quantity: new FormControl(null, Validators.compose([Validators.required])),
      });

      if (this.form.get('name')!.value == null) {
        this.foodId = null;
      } else {
        this.foodId = data.id;
      }
    }

  ngOnInit(): void {
  }

  touchFields() {
    this.form.controls['name'].markAsTouched({ onlySelf: true });
    this.form.controls['when'].markAsTouched({ onlySelf: true });
    this.form.controls['calories'].markAsTouched({ onlySelf: true });
    this.form.controls['quantity'].markAsTouched({ onlySelf: true });
  }

  onClick(): void {
    if (!this.form.controls['name'].valid || !this.form.controls['when'].valid || !this.form.controls['calories'].valid
    || !this.form.controls['quantity'].valid) {
      this.touchFields();
      return;
    }

    this.dialogRef.close({ data: this.form.value, foodId: this.foodId });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
