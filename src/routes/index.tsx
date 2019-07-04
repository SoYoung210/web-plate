import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GithubView } from '@/view/github';

export const EntryRoute = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/github' component={GithubView} />
		</Switch>
	</BrowserRouter>
);
