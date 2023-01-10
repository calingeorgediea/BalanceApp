import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendApiService } from '../services/backend-api.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // login
  public email: any = "";
  public password: any = "";

  // register
  public name: any = "";
  public email_reg: any = "";
  public password_reg: any = "";
  public registerSuccesful: boolean = false;

  // errors
  public emptyCredentials: boolean = false;
  public emptyCredentials_reg: boolean = false;
  public wrongCredentials: boolean = false;
  public invalidCredentials: boolean = false;

  constructor(public auth: BackendApiService, private router: Router) {}
  
  ngOnInit(): void {
    let offcanvasRight = document.getElementById('offcanvasRight')
    console.log(offcanvasRight);
    if (offcanvasRight) {
      offcanvasRight.addEventListener('hide.bs.offcanvas', this.resetRegisterCanvas.bind(this));
    }
  }
  
  resetRegisterCanvas() {
    console.log('intra aici');
    this.email_reg = '';
    this.password_reg = '';
    this.name = '';
    this.invalidCredentials = false;
    this.registerSuccesful = false;
  }

  register(email_reg: string, password_reg: string, name: string) {

    if (this.email_reg == '' || this.password_reg == '' || this.name == '') {
      this.emptyCredentials_reg = true;
      return;
    } else {
      this.emptyCredentials_reg = false;
    }
    this.auth.register(email_reg, password_reg, name).subscribe(res => {this.registerSuccesful = true}, error => {this.invalidCredentials = true});
  }

  login(email: string, password: string) {
    if (this.email == '' || this.password == '') {
      this.emptyCredentials = true;
      return;
    }
    else {
      this.emptyCredentials = false;
    }
    this.auth.login(email, password).subscribe(res => {
      console.log(res);
      localStorage.setItem('user_id', res['user']['_id']);
      localStorage.setItem('user_mail', res['user']['mail']);
      localStorage.setItem('user_name', res['user']['name']);
      localStorage.setItem('user_token', res['token']);

      this.router.navigateByUrl('home');
    }, error => this.wrongCredentials = true);
  }

}

function resetRegisterCanvas() {
  throw new Error('Function not implemented.');
}
