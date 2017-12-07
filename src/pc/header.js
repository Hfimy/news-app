import React, { Component } from 'react'
import { Row, Col, Menu, Icon, Modal, Button, Tabs, Form, Input,message } from 'antd'

const TabPane = Tabs.TabPane, FormItem = Form.Item;

class Header extends Component {
    state = {
        current: 'home',
        hasLogined: false,
        userName: '',
        showLoginModal: false,
        showRegistryModal: false,
        users: [],
    }
    handleClick = (e) => {
        if (e.key === 'login') {
            this.setState({ showLoginModal: true })
        }
        this.setState({
            current: e.key
        })
    }

    handleLoginCancel = () => {
        this.setState({ showLoginModal: false })
    }
    handleShowRegistry = () => {
        this.setState({ showLoginModal: false }, () => {
            this.setState({ showRegistryModal: true })
        })
    }
    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['username','password'],(err,values)=>{
            if(!err){
                const {username,password}=values;
                const users=this.state.users;
                for(let i=0;i<users.length;i++){
                    if(username===users[i].username&&password===users[i].password){
                        message.success('登录成功!');
                        this.setState({hasLogined:true,showLoginModal:false});
                        this.props.form.resetFields();
                        return;
                    }
                }
                message.error('用户名或密码错误');
                return;
            }
        })
    }


    handleRegistryCancel = () => {
        this.setState({ showRegistryModal: false })
    }
    handleRegistrySubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['re_username', 're_password', 'confirm_password'], (err, values) => {
            if (!err) {
                const { re_username: username, re_password: password } = values;
                const newUsers = this.state.users;
                newUsers.push({ username, password });
                this.props.form.resetFields();
                this.setState({ users: newUsers }, () => {
                    this.setState({ showRegistryModal: false });
                    message.success('注册成功');
                });
            }
        })
    }
    checkUsername = (rule, value, callback) => {
        const form = this.props.form;
        const users = this.state.users;
        if (value) {
            for (let i = 0; i < users.length; i++) {
                if (value === users[i].username) {
                    callback('Username already exists');
                    return;
                }
            }
            callback();
        } else {
            callback();
        }
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('re_password')) {
            callback('Inconsistent passwords!');
        } else {
            callback();
        }
    }
    render() {
        const { hasLogined, showLoginModal, showRegistryModal } = this.state;
        const { getFieldDecorator } = this.props.form;
        const userShow = hasLogined
            ? <Menu.Item key='userCenter' className='fr'><Icon type='appstore' />
                <Button type='primary'>用户名</Button>
                <Button type='dashed'>个人中心</Button>
                <Button type='default'>退出</Button>
            </Menu.Item>
            : <Menu.Item key='login' className='fr'><Icon type='appstore' />注册/登录
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
                        <Modal title='登录中心' visible={showLoginModal} onCancel={this.handleLoginCancel}
                            maskClosable={false} footer={null}>
                            <Form onSubmit={this.handleLoginSubmit}>
                                <FormItem label='用户名' {...formItemLayout}>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input prefix={<Icon type='user' />} placeholder='Username' />
                                        )}
                                </FormItem>
                                <FormItem label='密码' {...formItemLayout}>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your password!' }],
                                    })(
                                        <Input prefix={<Icon type='lock' />} type='password' placeholder='Password' />
                                        )}
                                </FormItem>
                                <FormItem>
                                    <span className='prompt-registry'>您还没有账户？ 请先注册一个吧！</span>
                                </FormItem>
                                <FormItem className='footer-btn'>
                                    <Button onClick={this.handleShowRegistry}>注册</Button>
                                    <Button type='primary' htmlType='submit'>登录</Button>
                                </FormItem>
                            </Form>
                        </Modal>
                        <Modal title='注册中心' visible={showRegistryModal} onCancel={this.handleRegistryCancel}
                            maskClosable={false} width={400} footer={null}>
                            <Form onSubmit={this.handleRegistrySubmit}>
                                <FormItem label='用户名' {...formItemLayout}>
                                    {getFieldDecorator('re_username', {
                                        rules: [{ required: true, message: 'Please input your username!' },
                                        { validator: this.checkUsername }],
                                    })(
                                        <Input prefix={<Icon type='user' />} placeholder='Username' />
                                        )}
                                </FormItem>
                                <FormItem label='密码' {...formItemLayout}>
                                    {getFieldDecorator('re_password', {
                                        rules: [{ required: true, message: 'Please input your password!' }],
                                    })(
                                        <Input prefix={<Icon type='lock' />} type='password' placeholder='Password' />
                                        )}
                                </FormItem>
                                <FormItem label='确认密码' {...formItemLayout}>
                                    {getFieldDecorator('confirm_password', {
                                        rules: [{ required: true, message: 'Please input your password!' },
                                        { validator: this.checkPassword }],
                                    })(
                                        <Input prefix={<Icon type='lock' />} type='password' placeholder='Confirm password' />
                                        )}
                                </FormItem>
                                <FormItem className='footer-btn'>
                                    <Button onClick={this.handleRegistryCancel}>取消</Button>
                                    <Button type='primary' htmlType='submit'>注册</Button>
                                </FormItem>
                            </Form>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}

export default Form.create({})(Header)