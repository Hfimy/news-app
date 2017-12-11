import React from 'react';
import {Router,Route,IndexRoute,Link,IndexLink,browserHistory,hashHistory} from 'react-router'

import App from './app'
import Container from './container'
import Detail from './newsDetail'
import NewsItem from './newsItem'

import '../../public/style/pc.less'

export default () => (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Container}/>
            <Route path='detail' component={Detail}>
                <Route path=':uniquekey' component={NewsItem}/>
            </Route>
        </Route>
    </Router>
)