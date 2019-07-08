import { createAction } from 'redux-actions';
import { of, Observable } from 'rxjs';
import { switchMap,map, catchError } from 'rxjs/operators';
import { AjaxError } from 'rxjs/ajax';
import { startLoading } from './loading';
import { Epic, ofType } from 'redux-observable';
import { ActionType } from '../_types/actionTypes';

export const createAsyncAction = (type: string) =>  {
  const FETCH = `${type}/FETCH`
  const SUCCESS = `${type}/SUCCESS`
  const FAILURE = `${type}/FAILURE`

  return {
    FETCH,
    SUCCESS,
    FAILURE,
    fetch: createAction(FETCH),
    success: createAction(SUCCESS),
    failure: createAction(FAILURE),
  }
}

export const createAsyncEpic = (type: string, req: (payload: any) => Observable<any>) => {
  const actions = createAsyncAction(type);

  const epic: Epic = (action$: any, state) => {

    return action$.pipe(
      ofType(actions.FETCH),
      switchMap((action: ActionType) => {
        startLoading(type);
        const payload = (action && action.payload) || null;
        return req(payload).pipe(
          map((res: any) => {
            return actions.success(res);
          }),
          catchError((error: AjaxError) => {
            return of(actions.failure(error)
          )})
        )
      }),

    )
  }
  
  return epic;
}
