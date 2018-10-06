import { combineEpics } from 'redux-observable';

import { authEpic } from '../auth';
import { journalEpic } from '../journal';

export const rootEpic = combineEpics(authEpic, journalEpic);
