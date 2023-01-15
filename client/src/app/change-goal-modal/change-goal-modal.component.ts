import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-goal-modal',
  templateUrl: './change-goal-modal.component.html',
  styleUrls: ['./change-goal-modal.component.css']
})
export class ChangeGoalModalComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<ChangeGoalModalComponent>,) { 
    this.form = new FormGroup({
      goal: new FormControl(null, Validators.compose([Validators.required]))
    });
  }

  ngOnInit(): void {
  }

  touchFields() {
    this.form.controls['goal'].markAsTouched({ onlySelf: true });
  }

  onClick(): void {
    if (!this.form.controls['goal'].valid) {
      this.touchFields();
      return;
    }

    this.dialogRef.close({ data: this.form.value });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
