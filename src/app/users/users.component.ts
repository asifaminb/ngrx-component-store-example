import { Component, OnInit } from '@angular/core';
import { UsersStore } from './users.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersStore],
})
export class UsersComponent {
  vm$ = this.store.vm$;
  constructor(private store: UsersStore) {}

  fetch() {
    this.store.getUsers({});
  }
}
