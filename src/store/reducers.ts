import { combineReducers } from 'redux';
import { loadingState, loadingReducer } from './_modules/loading';
import { myGitHubReducer, IMyGitHubState } from './github';
// import { homeMusicReducer, SebaMusicState } from './getMusicInfo';


export interface RootStoreState {
  github: IMyGitHubState;
  loading: loadingState;
}

export default combineReducers({ 
  github: myGitHubReducer,
  loading: loadingReducer,
});
