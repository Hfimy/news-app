import React, { PureComponent } from 'react'
import { Link } from 'react-router'

//添加发布订阅库，接收来自用户中心头像设置的通知
import PubSub from 'pubsub-js'

import { Row, Col, Menu,  Modal, Button,  Form, Input, message, Avatar, Tooltip } from 'antd'
import { handleResponse } from '../../common/util'

const  FormItem = Form.Item;

class Header extends PureComponent {
    state = {
        current: 'home',
        avatarUrl: '',
        showLoginModal: false,
        showRegistryModal: false,
    }

    handleClick = (e) => {
        if (e.key === 'login') {
            this.setState({ showLoginModal: true })
            return;
        }
        if (e.key === 'userCenter') {
            return;
        }
        this.setState({
            current: e.key
        })
    }
    handleLogout = (e) => {
        if (sessionStorage['hasLogined']) {
            sessionStorage.clear();
        }
    }

    handleLoginCancel = () => {
        this.setState({ showLoginModal: false })
    }
    handleToRegistry = () => {
        this.setState({ showLoginModal: false }, () => {
            this.setState({ showRegistryModal: true })
        })
    }
    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['username', 'password'], (err, values) => {
            if (!err) {
                let { username, password } = values;
                username = encodeURIComponent(username), password = encodeURIComponent(password);

                fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${username}&password=${password}`)
                    .then(handleResponse)
                    .then(res => {
                        if (res === null) {
                            message('用户名或密码错误');
                            return;
                        }
                        sessionStorage.setItem('hasLogined', true);
                        sessionStorage.setItem('UserId', res.UserId);
                        sessionStorage.setItem('UserNickname', res.NickUserName);
                        this.setState({ showLoginModal: false });
                        message.success('登录成功!');
                        this.props.form.resetFields();
                    }).catch(e => message.error('请求出错了'))
            }
        })
    }


    handleRegistryCancel = () => {
        this.setState({ showRegistryModal: false })
    }
    handleBackToLogin = () => {
        this.setState({ showRegistryModal: false }, () => {
            this.setState({ showLoginModal: true })
        })
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('re_password')) {
            callback('Inconsistent passwords!');
        } else {
            callback();
        }
    }
    handleRegistrySubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['re_username', 're_password', 'confirm_password'], (err, values) => {
            if (!err) {
                let { re_username: username, re_password: password } = values;
                username = encodeURIComponent(username), password = encodeURIComponent(password);
                fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=${username}&r_password=${password}&r_confirmPassword=${password}`)
                    .then(handleResponse)
                    .then(res => {
                        if (res !== true) {
                            message('注册失败')
                            return;
                        }
                        this.setState({ showRegistryModal: false });
                        message.success('注册成功');
                        this.props.form.resetFields();
                    }).catch(e => message.error('请求出错了'))
            }
        })
    }

    componentDidMount() {
        PubSub.subscribe('CHANGE_AVATAR', (msg, avatarUrl) => {
            this.setState({ avatarUrl })
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe('changeAvatar')
    }
    //通过scrollIntoView自定义实现锚点跳转
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                console.log('确定跳转？')
                anchorElement.scrollIntoView();
            }
        }
    }
    render() {
        const { showLoginModal, showRegistryModal, avatarUrl } = this.state;
        const { getFieldDecorator } = this.props.form;
        const userCenter = sessionStorage.getItem('hasLogined')
            ? <Menu.Item key='userCenter' className='fr header-usercenter'>
                <Tooltip placement='bottomLeft' title={`欢迎您，${sessionStorage.getItem('UserNickname')}`}>
                    <Link to='/usercenter' class='avatar-link'><Avatar class='user-avatar' icon='user' src={avatarUrl} /></Link>
                </Tooltip>
                <Button type='primary'><Link to='/usercenter'>个人中心</Link></Button>
                <Button type='dashed' onClick={this.handleLogout}><Link to='/'>退出</Link></Button>
                {/* <a class='avatar-link' onClick={() => this.scrollToAnchor('avatar')}>  锚点跳转</a> */}
            </Menu.Item>
            : <Menu.Item key='login' className='fr'>注册/登录
            </Menu.Item>;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                offset: 1,
                span: 17
            }
        }
        return (
            <header>
                <Row>
                    <Col span={3}></Col>
                    <Col span={3} class='logo'>
                        <Link to='/'>
                            <img src={`${require('../../../public/image/logo.png')}`} />
                            <span>新闻首页</span>
                        </Link>
                    </Col>
                    <Col span={15}>
                        <Menu defaultSelectedKeys={['home']} selectedKeys={[this.state.current]} onClick={this.handleClick} mode="horizontal">
                            <Menu.Item key='home'><Link to='/'>首页</Link></Menu.Item>
                            <Menu.Item key='entertainment'>娱乐</Menu.Item>
                            <Menu.Item key='military'>军事</Menu.Item>
                            <Menu.Item key='sports'>体育</Menu.Item>
                            <Menu.Item key='domestic'>国内</Menu.Item>
                            <Menu.Item key='international'>国际</Menu.Item>
                            <Menu.Item key='finance'>财经</Menu.Item>
                            <Menu.Item key='technology'>科技</Menu.Item>
                            {userCenter}
                        </Menu>
                        <Modal title='登录中心' visible={showLoginModal} onCancel={this.handleLoginCancel}
                            maskClosable={false} footer={null}>
                            <Form onSubmit={this.handleLoginSubmit}>
                                <FormItem label='用户名' {...formItemLayout}>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input  placeholder='Username' />
                                        )}
                                </FormItem>
                                <FormItem label='密码' {...formItemLayout}>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your password!' }],
                                    })(
                                        <Input  type='password' placeholder='Password' />
                                        )}
                                </FormItem>
                                <FormItem>
                                    <span className='prompt-registry'>您还没有账户？ 请先注册一个吧！</span>
                                </FormItem>
                                <FormItem className='footer-btn'>
                                    <Button onClick={this.handleToRegistry}>注册</Button>
                                    <Button type='primary' htmlType='submit'>登录</Button>
                                </FormItem>
                            </Form>
                        </Modal>
                        <Modal title='注册中心' visible={showRegistryModal} onCancel={this.handleRegistryCancel}
                            maskClosable={false} footer={null}>
                            <Form onSubmit={this.handleRegistrySubmit}>
                                <FormItem label='用户名' {...formItemLayout}>
                                    {getFieldDecorator('re_username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input  placeholder='Username' />
                                        )}
                                </FormItem>
                                <FormItem label='密码' {...formItemLayout}>
                                    {getFieldDecorator('re_password', {
                                        rules: [{ required: true, message: 'Please input your password!' }],
                                    })(
                                        <Input  type='password' placeholder='Password' />
                                        )}
                                </FormItem>
                                <FormItem label='确认密码' {...formItemLayout}>
                                    {getFieldDecorator('confirm_password', {
                                        rules: [{ required: true, message: 'Please input your password!' },
                                        { validator: this.checkPassword }],
                                    })(
                                        <Input  type='password' placeholder='Confirm password' />
                                        )}
                                </FormItem>
                                <FormItem className='footer-btn'>
                                    <Button onClick={this.handleBackToLogin}>返回</Button>
                                    <Button type='primary' htmlType='submit'>注册</Button>
                                </FormItem>
                            </Form>
                        </Modal>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </header>
        )
    }
}

export default Form.create({})(Header)