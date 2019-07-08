import { combineEpics } from 'redux-observable';
import { myGitHubEpic } from './github';

export default combineEpics(
  myGitHubEpic
)
