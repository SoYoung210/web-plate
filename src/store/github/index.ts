import { handleActions, Action } from 'redux-actions'
import { ACTION_TYPES } from "../_types/constants";
import { createAsyncAction, createAsyncEpic } from '../_modules/actionUtils';
import { ActionType } from "../_types/actionTypes";
import { getMyGitHubProfile } from '@/api/github';
import { List } from 'immutable';
import { emptyList } from '@/_util';

export const GITHUB_PREFIX = ACTION_TYPES.GITHUB;

export interface IMyGitHubRequest {
  targetName: string;
  userType: SEARCH_TYPE;
}

interface IGitHubContents {
  login: string
  html_url: string
  blog: string
  avatar_url: string
}

export interface IMyGitHubState {
  requestPayload: IMyGitHubRequest
  contents: List<IGitHubContents>
  errorMessage: string
}

export enum SEARCH_TYPE {
  USER = 'user',
  ORG = 'org',
  ALL = 'all'
}

const initialState: IMyGitHubState = {
  requestPayload: {
    targetName: '',
    userType: SEARCH_TYPE.ALL,
  },
  contents: emptyList(),
  errorMessage: '',
}

export const myGitHub = createAsyncAction(GITHUB_PREFIX);

const reducer = {
  [myGitHub.FETCH]: (state: IMyGitHubState, action: ActionType) => {

    return {
      ...state,
      requestPayload: action.payload
    }
  },
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
