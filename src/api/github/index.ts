import { ajax } from 'rxjs/ajax';
import { IMyGitHubRequest, SEARCH_TYPE } from '@/store/github';
// SEARCH_TYPE
export function getMyGitHubProfile(requestPayload: IMyGitHubRequest) {
  const { targetName, userType } = requestPayload;
  const baseUrl = `https://api.github.com/search/users?q=${targetName}`;
  let targetUrl;

  switch (userType) {
    case SEARCH_TYPE.ORG:
      targetUrl = baseUrl.concat('+type%3Aorg&type=Users');
      break;
    case SEARCH_TYPE.USER:
      targetUrl = baseUrl.concat('+type%3Auser&type=User');
      break;
    default:
      targetUrl = baseUrl;
      break;
  }
  console.log('t',targetUrl);
  const response = ajax.getJSON(targetUrl);
  
  return response
}
