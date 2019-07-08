import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStoreState } from '@/store/reducers';
import { loadingState } from '@/store/_modules/loading';
import { IMyGitHubState, myGitHub, GITHUB_PREFIX } from '@/store/github';

const MyGitHubContainer: React.FC = () => {
  const isLoading = useSelector<RootStoreState, loadingState>(state => state.loading)
  const { contents } = useSelector<RootStoreState, IMyGitHubState>(
    state => state[GITHUB_PREFIX],
  );

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(myGitHub.fetch())
  }, [dispatch])

  if (isLoading[GITHUB_PREFIX]) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <div>
        <span>NAME: </span>
        {contents.login}
      </div>
      <div>
        <span>URL: </span>
        {contents.html_url}
      </div>
      <div>
        <span>BLOG: </span>
        {contents.blog}
      </div>
      <img src={contents.avatar_url} alt="profile_image" />
    </div>
  )
}

export default MyGitHubContainer
