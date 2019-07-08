import { handleActions, Action } from 'redux-actions'
import { ACTION_TYPES } from "../_types/constants";
import { createAsyncAction, createAsyncEpic } from '../_modules/actionUtils';
import { ActionType } from "../_types/actionTypes";
import { getMyGitHubProfile } from '@/api/github';
import { from } from 'rxjs';  

export const GITHUB_PREFIX = ACTION_TYPES.GITHUB;

interface IGitHubContents {
  login: string
  html_url: string
  blog: string
  avatar_url: string
}

export interface IMyGitHubState {
  contents: IGitHubContents
  errorMessage: string
}

const initialState: IMyGitHubState = {
  contents: {
    login: '',
    html_url: '',
    blog: '',
    avatar_url: '',
  },
  errorMessage: '',
}

export const myGitHub = createAsyncAction(GITHUB_PREFIX);

const reducer = {
  [myGitHub.SUCCESS]: (state: IMyGitHubState, action: ActionType) => ({
    ...state,
    contents: action.payload,
  }),
  [myGitHub.FAILURE]: (state: IMyGitHubState, action: ActionType) => ({
    ...state,
    errorMessage: action.payload,
  }),  
}

export const myGitHubReducer = handleActions(reducer, initialState)
export const myGitHubEpic = createAsyncEpic(GITHUB_PREFIX, getMyGitHubProfile);
