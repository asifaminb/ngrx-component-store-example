import { Component } from '@angular/core';
import {AlbumsStore} from "./albums.store";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  providers: [AlbumsStore],
})
export class AlbumsComponent {
  vm$ = this.store.vm$;
  constructor(private store: AlbumsStore) {}

  ngOnInit() {
    this.store.getAlbums({});
  }

  fetch() {
    this.store.getAlbums({});
  }
}
