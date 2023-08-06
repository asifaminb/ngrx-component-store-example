import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { delay, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BaseComponentStore, GenericState } from '../base-component.store';

interface Album {
  id: number;
  userId: number;
  title: string;
}

interface AlbumViewModel {
  albums: Album[];
  status: string;
  totalCount: number;
  error: HttpErrorResponse;
}

@Injectable()
export class AlbumsStore extends BaseComponentStore<GenericState<Album[]>> {
  readonly albums$ = this.select((state) => state.data);

  // @ts-ignore
  readonly vm$: Observable<AlbumViewModel> = this.select(
    this.baseSelector,
    this.albums$,
    (state, albums) => (
      { ...state, albums }
    )
  );

  constructor(private readonly http: HttpClient) {
    super({
      data: [],
      status: 'START',
      totalCount: 0,
    });
    this.vm$.subscribe((data) => console.log(data, 'asif'))
  }

  readonly getAlbums = this.effect((params$: Observable<unknown>) => {
    return params$.pipe(
      tap((_) => this.setLoading()),
      switchMap((_) =>
        this.http
          .get<Album[]>('https://jsonplaceholder.typicode.com/albums')
          .pipe(
            delay(300),
            tapResponse(
              (users: Album[]) => this.updateSuccess(users),
              (error: HttpErrorResponse) => this.updateError(error)
            )
          )
      )
    );
  });
}
