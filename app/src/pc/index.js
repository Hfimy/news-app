import React from 'react';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory,hashHistory} from 'react-router'

import App from './container/app'
import Container from './container/container'
import Detail from './container/newsDetail'
import UserCenter from './container/userCenter'

import '../../public/style/pc.less'

export default () => (
    <Router history={hashHistory} >
        <Route path='/' component={App}>
            <IndexRoute ignoreScrollBehavior={true} component={Container}/>
            <Route path='detail/:uniquekey' component={Detail}/>
            <Route ignoreScrollBehavior={true} path='/usercenter' component={UserCenter}/>
        </Route>
    </Router>
)