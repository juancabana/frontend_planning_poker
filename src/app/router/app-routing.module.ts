import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from '../pages/room/room.page';
import { HomeComponent } from '../pages/home/home.page';
import { NotFoundComponent } from '../pages/not-found/not-found.page';
import { roomExistsGuard } from '../guards/room-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'room/:id_room',
    component: RoomComponent,
    canActivate: [roomExistsGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
