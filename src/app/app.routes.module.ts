import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.page';
import { RoomComponent } from './pages/room/room.page';
import { roomExistsGuard } from './guards/room-exists.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { authGuard } from './guards/auth.guard';
import { ConfirmCodeComponent } from './pages/auth/confirm-code/confirm-code.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'sign-up',
    component: SignUpComponent,

  },
  {
    path: 'confirm-code',
    component: ConfirmCodeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create-room',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'room/:id_room',
    component: RoomComponent,
    canActivate: [roomExistsGuard],
  },
  {
    path: '**',
    redirectTo: 'create-room',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
