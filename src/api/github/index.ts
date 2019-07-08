import { ajax } from 'rxjs/ajax';

export function getMyGitHubProfile(targetName: any) {
  const response = ajax.getJSON(`https://api.github.com/search/users?q=${targetName}`);
  
  return response
}
