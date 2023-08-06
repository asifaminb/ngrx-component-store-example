import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import { delay, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BaseComponentStore, GenericState } from '../base-component.store';

interface User {
  name: string;
  height: string;
  gender: string;
}

interface UserViewModel {
  users: User[];
  loading: boolean;
  totalCount: number;
  error: HttpErrorResponse;
}

@Injectable()
export class UsersStore extends BaseComponentStore<GenericState<User[]>> {
  readonly users$ = this.select((state) => state.data);

  // @ts-ignore
  readonly vm$: Observable<UserViewModel> = this.select(
    this.baseSelector,
    this.users$,
    (state, users) => (
      { ...state, users }
    )
  );
  constructor(private readonly http: HttpClient) {
    super({
      data: [],
      status: 'START',
      totalCount: 0,
    });

  }

  readonly getUsers = this.effect((params$: Observable<unknown>) => {
    return params$.pipe(
      tap((_) => this.setLoading()),
      switchMap((_) =>
        this.http
          .get<User[]>('https://swapi.dev/api/people/?format=json')
          .pipe(
            delay(300),
            tapResponse(
              (data: any) => this.updateSuccess(data.results),
              (error: HttpErrorResponse) => this.updateError(error)
            ),
            tap(console.log)
          )
      )
    );
  });
}
