import React, { Component } from 'react'
import { Row, Col, Menu, Icon, Modal, Button } from 'antd'

class Header extends Component {
    state = {
        current: 'home',
    }
    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }
    render() {
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <img src='./image/logo.png' width='48'/>
                        <span>新闻首页</span>
                    </Col>
                    <Col span={16}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal">
                            <Menu.Item key='home'>
                                <Icon type='home' />首页
                            </Menu.Item>
                            <Menu.Item key='entertainment'>
                                <Icon type='appstore' />娱乐
                            </Menu.Item>
                            <Menu.Item key='military'>
                                <Icon type='appstore' />军事
                            </Menu.Item>
                            <Menu.Item key='sports'>
                                <Icon type='appstore' />体育
                             </Menu.Item>
                            <Menu.Item key='domestic'>
                                <Icon type='appstore' />国内
                            </Menu.Item>
                            <Menu.Item key='international'>
                                <Icon type='appstore' />国际
                            </Menu.Item>
                            <Menu.Item key='finance'>
                                <Icon type='appstore' />财经
                            </Menu.Item>
                            <Menu.Item key='technology'>
                                <Icon type='appstore' />科技
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}

export default Header