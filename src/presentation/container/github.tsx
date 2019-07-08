import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStoreState } from '@/store/reducers';
import { loadingState } from '@/store/_modules/loading';
import { IMyGitHubState, myGitHub, GITHUB_PREFIX, SEARCH_TYPE } from '@/store/github';
import { useDebounce } from '@/_util/hooks';

const mockImageUrl = 'https://camo.githubusercontent.com/7c14d0bf0e0ffdccc1f8e91db35cb4b39e62b03e/68747470733a2f2f73332e61702d6e6f727468656173742d322e616d617a6f6e6177732e636f6d2f7261696e6973742d696e7465726e616c2f746563686e6963616c2d696e746572766965772d696e737472756374696f6e732f776972656672616d652e737667';

const styles = require('./styles.pcss');

const MyGitHubContainer: React.FC = () => {
  const [targetName, setTargetName] = useState('');
  const [userType, setUserType] = useState(false);
  const [orgType, setOrgType] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const isLoading = useSelector<RootStoreState, loadingState>(state => state.loading)
  const { contents } = useSelector<RootStoreState, IMyGitHubState>(
    state => state[GITHUB_PREFIX],
  );
  const dispatch = useDispatch();

  const debouncedSearchTerm = useDebounce(targetName, 500);

  useEffect(() => {
    console.log('userType', userType, 'orgType',orgType);

    if (!targetName) {
      return;
    }
    
    if (debouncedSearchTerm) {
      setIsSearching(true);
      dispatch(myGitHub.fetch({
        targetName,
        userType: getSearchOption(),
      }))
    }

  }, [
    debouncedSearchTerm,
    userType,
    orgType
  ])

  const getSearchOption = () => {
    if (!userType && !orgType) {
      return SEARCH_TYPE.ALL;
    } else if (userType) {
      return SEARCH_TYPE.USER;
    } else if (orgType) {
      return SEARCH_TYPE.ORG;
    }
  }

  if (isLoading[GITHUB_PREFIX]) {
    return <div>Loading...</div>
  }
  
  return (
    <div className={ styles.wrap }>
      <div className={ styles.formWrapper }>
        <input 
          value={targetName} 
          onChange={(e) => {
            setTargetName(e.target.value)}
          }
          placeholder='soso'
        />
      </div>

      <div className={ styles.form }>
        <div>
          <input type='checkbox' checked={userType} onChange={() => setUserType(!userType)}/> User
        </div>
        <div>
          <input type='checkbox' checked={orgType} onChange={() => setOrgType(!orgType)}/> organization
        </div>
      </div>
      <div className={ styles.grid }>
        {
          contents.items && contents.items.map((value:any, index: number) => (
            <div key={value.id}>
              {
                value.type === 'User' ? (
                  <div className={ styles.userName }>{value.login}</div>
                ) : (
                  <img src={value.avatar_url} alt="profile_image" />
                )
              }
              
            </div>
          ))
        } 
      </div>
      <p>
        Github User 또는 Organization의 이름을 검색할 수 있습니다. <br/>
        검색은 Github User Search API를 이용하여 구현합니다.<br/>
        검색 결과는 하단에 Grid로 표현되며 type에 따라 다른 형태로 표현됩니다.<br/>
        Organization은 avatar_url 값을 이용하여 프로필 이미지를 표시합니다.<br/>
        User는 login 값을 이용하여 사용자 이름을 표시합니다.<br/>
        검색 필터를 설정할 수 있습니다.<br/>
        검색 대상 선택 (User, Organization)<br/>
        검색 대상을 선택하지 않았을 경우에는 전체를 대상으로 검색합니다.<br/>
        보유 레포지토리 수를 조건으로 검색<br/><br/>
        보유 레포지토리 개수가 입력된 숫자 값 이상인 대상으로 검색합니다.<br/>
        API를 일정 시간 내 계속해서 호출 시 차단이 될 수 있습니다.<br/>
      </p>
    </div>
  )
}

export default MyGitHubContainer
