import React, { Component } from 'react'
import { Row, Col, Menu, Icon, Modal, Button,Tabs,Form,Input } from 'antd'

const TabPane=Tabs.TabPane,FormItem=Form.Item;

class Header extends Component {
    state = {
        current: 'home',
        hasLogined: false,
        userName: '',
        showModal: false,
    }
    handleClick = (e) => {
        if (e.key === 'login') {
            this.setState({ showModal: true })
        }
        this.setState({
            current: e.key
        })
    }
    handleOk = () => {
        console.log('ok')
    }
    handleCancel = () => {
        this.setState({showModal:false})
    }
    render() {
        const { hasLogined, userName, showModal } = this.state;
        const userShow = hasLogined
            ? <Menu.Item key='userCenter' className='fr'><Icon type='appstore' />
                <Button type='primary'>{userName}</Button>
                <Button type='dashed'>个人中心</Button>
                <Button type='default'>退出</Button>
            </Menu.Item>
            : <Menu.Item key='login' className='fr'><Icon type='appstore' />注册/登录
            </Menu.Item>;
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4} className='logo'>
                        <img src='./image/logo.png' width='48' />
                        <span>新闻首页</span>
                    </Col>
                    <Col span={16}>
                        <Menu selectedKeys={[this.state.current]} onClick={this.handleClick} mode="horizontal">
                            <Menu.Item key='home'><Icon type='home' />首页</Menu.Item>
                            <Menu.Item key='entertainment'><Icon type='appstore' />娱乐</Menu.Item>
                            <Menu.Item key='military'><Icon type='appstore' />军事</Menu.Item>
                            <Menu.Item key='sports'><Icon type='appstore' />体育</Menu.Item>
                            <Menu.Item key='domestic'><Icon type='appstore' />国内</Menu.Item>
                            <Menu.Item key='international'><Icon type='appstore' />国际</Menu.Item>
                            <Menu.Item key='finance'><Icon type='appstore' />财经</Menu.Item>
                            <Menu.Item key='technology'><Icon type='appstore' />科技</Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal title='用户中心' visible={showModal} onOk={this.handleOk} onCancel={this.handleCancel}
                            cancelText='取消' okText='确定' maskClosable={false}>
                            <Tabs onChange={this.changeTab} type='card'>
                                <TabPane tab='登录' key='1'></TabPane>
                                <TabPane tab='注册' key='2'></TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}

export default Header