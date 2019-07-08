import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GithubView } from '@/presentation/view/github';
import { Provider } from 'react-redux'
import store from '@/store/stores'

export const EntryRoute = () => (
	<BrowserRouter>
    <Provider store={store}>
		<Switch>
			<Route path='/github' component={GithubView} />
		</Switch>
    </Provider>
	</BrowserRouter>
);
