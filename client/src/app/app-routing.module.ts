import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainPageComponent },
  { path: 'diary', component: DiaryComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
