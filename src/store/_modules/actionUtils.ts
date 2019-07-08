import { createAction } from 'redux-actions';
import { of } from 'rxjs';
import { switchMap,map, catchError } from 'rxjs/operators';
import { AjaxError } from 'rxjs/ajax';
import { startLoading } from './loading';
import { Epic, ofType } from 'redux-observable';

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

export const createAsyncEpic = (type: string, req: any) => {
  const actions = createAsyncAction(type);
  
  const epic: Epic = (action$: any) => {
    const payload = (action$ && action$.payload) || null;

    return action$.pipe(
      ofType(actions.FETCH),
      startLoading(type),
      switchMap(() => {
        return req(payload).pipe(
          map((res: any) => {
            actions.success(res);
          }),
          catchError((error: AjaxError) => of(
            actions.failure(error)
          ))
        )
      }),

    )
  }
  
  return epic;
}
