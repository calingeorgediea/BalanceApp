import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.form = new FormGroup({
      age: new FormControl(data != null ? data.age : null, Validators.compose([Validators.required])),
      height: new FormControl(data != null ? data.height : null, Validators.compose([Validators.required])),
      activityLevel: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
  }

  touchFields() {
    this.form.controls['age'].markAsTouched({ onlySelf: true });
    this.form.controls['height'].markAsTouched({ onlySelf: true });
    this.form.controls['activityLevel'].markAsTouched({ onlySelf: true });
  }

  onClick(): void {
    if (!this.form.controls['age'].valid || !this.form.controls['height'].valid || !this.form.controls['activityLevel'].valid) {
      this.touchFields();
      return;
    }

    this.dialogRef.close({ data: this.form.value });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
