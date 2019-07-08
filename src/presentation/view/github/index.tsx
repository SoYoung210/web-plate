import React from 'react'
import MyGitHubContainer from '@/presentation/container/github';

const styles = require('./styles.pcss');

export const GithubView: React.FC = () => (
  <div className={ styles.wrap } >
    <MyGitHubContainer />>
  </div>
)
