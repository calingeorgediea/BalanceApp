import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddExerciseComponent>) { 
    this.form = new FormGroup({
      name: new FormControl(null, Validators.compose([Validators.required])),
      calories: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])),
    });
  }

  ngOnInit(): void {
  }

  touchFields() {
    this.form.controls['name'].markAsTouched({ onlySelf: true });
    this.form.controls['calories'].markAsTouched({ onlySelf: true });
  }

  onClick(): void {
    if (!this.form.controls['name'].valid || !this.form.controls['calories'].valid) {
      this.touchFields();
      return;
    }

    this.dialogRef.close({ data: this.form.value });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
