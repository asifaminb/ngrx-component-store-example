import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

type possibleStatus = 'SUCCESS' | 'LOADING' | 'START' | HttpErrorResponse;

export interface GenericState<T> {
  data: T;
  status: possibleStatus;
  totalCount: number;
}

@Injectable()
export class BaseComponentStore<T extends GenericState<unknown>> extends ComponentStore<T> {

  baseSelector = this.select(({ status, totalCount }) => ({
    totalCount,
    status,
    error: status instanceof HttpErrorResponse ? status : undefined,
  }));

  protected updateError = this.updater((state, error: possibleStatus) => ({
    ...state,
    status: 'ERROR',
  }));

  protected setLoading = this.updater((state) => ({
    ...state,
    data: undefined,
    status: 'LOADING',
  }));

  protected updateSuccess = this.updater((state, data: T['data']) => ({
    ...state,
    data,
    totalCount: Array.isArray(data) ? data.length : 0,
    status: 'SUCCESS',
  }));

}
