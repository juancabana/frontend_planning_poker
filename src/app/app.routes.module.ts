import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.page';
import { RoomComponent } from './pages/room/room.page';
import { roomExistsGuard } from './guards/room-exists.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create-room',
    pathMatch: 'full',
  },
  {
    path: 'create-room',
    component: HomeComponent,
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
