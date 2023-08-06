import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { UsersComponent } from './users/users.component';
import {CountComponent} from "./count.component";
import {HttpClientModule} from "@angular/common/http";
import { SpecificUserComponent } from './specific-user/specific-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    UsersComponent,
    CountComponent,
    SpecificUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
