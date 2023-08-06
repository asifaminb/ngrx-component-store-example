import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {AlbumsComponent} from "./albums/albums.component";

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
