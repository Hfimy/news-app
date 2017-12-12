import React, { PureComponent } from 'react';
import { Link } from 'react-router'

import NewsList from './newsList'
import ImageList from './imageList'

import { Row, Col, Carousel, Tabs } from 'antd'

const TabPane = Tabs.TabPane;

export default class Container extends PureComponent {

    render() {
        return (
            <Row class='container'>
                <Col span={2} />
                <Col span={20}>
                    <div class='left'>
                        <div class='carousel clearfix'>
                            <Carousel autoplay={true}>
                                <Link to='/detail/161026201417643'><img src='./image/1.png' /></Link>
                                <Link to='/detail/161026201417643'><img src='./image/2.jpeg' /></Link>
                                <Link to='/detail/161026201417643'><img src='./image/3.jpeg' /></Link>
                                <Link to='/detail/161026201417643'><img src='./image/4.jpeg' /></Link>
                            </Carousel>
                        </div>
                        <ImageList type='junshi' count={6} cardTitle='军事新闻' />
                    </div>
                    <div class='news-list clearfix'>
                        <Tabs>
                            <TabPane tab='头条' key='1'>
                                <NewsList />
                            </TabPane>
                            <TabPane tab='国际' key='2'>
                                <NewsList type='guoji' count={22} />
                            </TabPane>
                        </Tabs>
                    </div>

                    <div class='clearfix'>
                        <ImageList type='caijing' count={10} cardTitle='财经新闻' />
                        <ImageList type='yule' count={20} cardTitle='娱乐新闻' />
                    </div>
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}