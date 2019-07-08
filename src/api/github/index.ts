import { ajax, AjaxResponse } from 'rxjs/ajax';

export function getMyGitHubProfile() {
  const response = ajax.getJSON('https://api.github.com/users/SoYoung210');
  
  return response
}
