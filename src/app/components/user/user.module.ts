import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './user.service';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UiGuard } from 'src/app/guards/ui.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [UiGuard],
    component: LoginComponent,
  },
  {
    path: 'signup',
    canActivate: [UiGuard],
    component: SignupComponent,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent, SignupComponent],
  providers: [UserService,  UiGuard],
})
export class UserModule {}
