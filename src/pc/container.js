import React, { PureComponent } from 'react';
import { Link } from 'react-router'

import NewsList from './newsList'
import ImageList from './imageList'
import Product from './production'

import { Row, Col, Carousel, Tabs } from 'antd'
import { handleResponse } from '../common/util'

const TabPane = Tabs.TabPane;

export default class Container extends PureComponent {

    render() {
        return (
            <Row class='container'>
                <Col span={3} />
                <Col span={18}>
                    <div class='container-content'>
                        <div class='news-list-wrapper'>
                            <div class='news-list clearfix'>
                                <Tabs class='news-list-tab'>
                                    <TabPane tab='头条' key='1'>
                                        <NewsList type='top' count={22}/>
                                    </TabPane>
                                    <TabPane tab='国际' key='2'>
                                        <NewsList type='guoji' count={22} />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                        <div class='left clearfix'>
                            <div class='carousel clearfix'>
                                <Carousel autoplay={true}>
                                    <Link to='/detail/161028202106247'><img src='./static/image/p1.jpeg' /></Link>
                                    <Link to='/detail/161028200451646'><img src='./static/image/p2.jpeg' /></Link>
                                    <Link to='/detail/160918190420094'><img src='./static/image/p3.jpeg' /></Link>
                                    <Link to='/detail/161022131757539'><img src='./static/image/p4.jpg' /></Link>
                                </Carousel>
                            </div>
                            <ImageList type='junshi' count={6} cardTitle='军事新闻' imgWidth='110px' />
                        </div>
                        <div class='right clearfix'>
                            <Product />
                        </div>
                    </div>
                    <div class='clearfix'>
                        <ImageList type='caijing' count={9} cardTitle='财经新闻' />
                        <ImageList type='yule' count={18} cardTitle='娱乐新闻' />
                    </div>
                </Col>
                <Col span={3} />
            </Row>
        )
    }
}