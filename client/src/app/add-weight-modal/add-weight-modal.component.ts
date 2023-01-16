import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-weight-modal',
  templateUrl: './add-weight-modal.component.html',
  styleUrls: ['./add-weight-modal.component.css']
})
export class AddWeightModalComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddWeightModalComponent>,) {
    this.form = new FormGroup({
      weight: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]))
    });
   }

  ngOnInit(): void {
  }

  touchFields() {
    this.form.controls['weight'].markAsTouched({ onlySelf: true });
  }

  onClick(): void {
    if (!this.form.controls['weight'].valid) {
      this.touchFields();
      return;
    }

    this.dialogRef.close({ data: this.form.value });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
