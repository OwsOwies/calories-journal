import { Navigation } from 'react-native-navigation';
import { combineEpics, ofType, Epic } from 'redux-observable';
import { mapTo, tap } from 'rxjs/operators';

import { AuthActionTypes, LoginError } from './actions';
import { Views as AuthViews } from './navigation';

const login: Epic = action$ =>
    action$.pipe(
        ofType(AuthActionTypes.LOGIN),
        tap(() => Navigation.showModal({ component: { name: AuthViews.SOME_VIEW } })),
        mapTo(new LoginError('some error')),
    );

export const authEpic = combineEpics(login);
