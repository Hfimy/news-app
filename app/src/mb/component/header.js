import React, { PureComponent } from 'react'
import { Link } from 'react-router'

//添加发布订阅库，接收来自用户中心头像设置的通知
// import PubSub from 'pubsub-js'

import { Icon, Modal, Button, Form, Input, message, Avatar, Tooltip } from 'antd'
// import { handleResponse } from '../../common/util'

const FormItem = Form.Item;

class Header extends PureComponent {
    // state = {
    //     avatarUrl: '',
    //     showLoginModal: false,
    //     showRegistryModal: false,
    // }
    render() {
        // const { showLoginModal, showRegistryModal, avatarUrl } = this.state;
        
        const { getFieldDecorator } = this.props.form;
        // const userCenter = sessionStorage.getItem('hasLogined')
        //     ? <Tooltip placement='bottomLeft' title={`欢迎您，${sessionStorage.getItem('UserNickname')}`}>
        //         <Link to='/usercenter' class='avatar-link'><Avatar class='user-avatar' icon='user' src={avatarUrl} /></Link>
        //     </Tooltip>
        //     : <Icon type='appstore' />
        return (
            <header>
                <Link to='/' class='logo'>
                    <img src={`${require('../../../public/image/logo.png')}`} />
                    <span>新闻首页</span>
                </Link>
                {/* {userCenter} */}
                {/* <Modal title='登录中心' visible={showLoginModal} onCancel={this.handleLoginCancel}
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
                            <Button onClick={this.handleBackToLogin}>返回</Button>
                            <Button type='primary' htmlType='submit'>注册</Button>
                        </FormItem>
                    </Form>
                </Modal> */}
            </header>
        )
    }
}

export default Form.create({})(Header)