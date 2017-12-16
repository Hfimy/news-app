import React from 'react';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory,hashHistory} from 'react-router'

import App from './app'
import Container from './container'
import Detail from './newsDetail'
import UserCenter from './userCenter'

import '../../public/style/pc.less'

export default () => (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute ignoreScrollBehavior={true} component={Container}/>
            <Route path='detail/:uniquekey' component={Detail}/>
            <Route ignoreScrollBehavior={true} path='/usercenter' component={UserCenter}/>
        </Route>
    </Router>
)