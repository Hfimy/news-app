import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { handleResponse } from './util'

import { Form, Input, Button, Card, message, notification } from 'antd'
const FormItem = Form.Item;
const { TextArea } = Input;

class Comment extends PureComponent {


    static propTypes = {
        uniquekey: PropTypes.string
    }
    static defaultProps = {}
    state = {
        commentList: [],
    }

    componentWillMount() {
        this._isMounted = true;
        if (this.props.uniquekey !== undefined) {
            this.updateComment(this.props.uniquekey);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.uniquekey && nextProps.uniquekey !== this.props.uniquekey) {
            this.updateComment(nextProps.uniquekey);
        }
        return true;
    }
    updateComment = (key) => {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${key}`, { method: 'GET' })
            .then(handleResponse)
            .then(res => {
                if (this._isMounted) {
                    this.setState({ commentList: res })
                }
            }).catch(e => message.error('请求出错了'))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!sessionStorage.hasLogined) {
            message.warning('请先登录');
            return;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const comment = encodeURIComponent(values.comment);
                fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userId=${sessionStorage.UserId}&uniquekey=${this.props.uniquekey}&commnet=${comment}`, { method: 'GET' })
                    .then(handleResponse)
                    .then(res => {
                        if (res !== true) {
                            notification['error']({ message: 'React News', description: '评论失败！' })
                            return;
                        }
                        this.updateComment(this.props.uniquekey)
                    }).catch(e => message.error('请求出错了'))

                this.props.form.resetFields();
            }
        })
    }
    addTOCollection = () => {
        if (!sessionStorage.hasLogined) {
            message.warning('请先登录');
            return;
        }
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userId=${sessionStorage.UserId}&uniquekey=${this.props.uniquekey}`, { method: 'GET' })
            .then(handleResponse)
            .then(res => {
                if (res !== true) {
                    notification['error']({ message: 'React News', description: '收藏失败！' })
                    return;
                }
                notification['success']({ message: 'React News', description: '收藏成功！' })
            }).catch(e => message.error('请求出错了'))
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { commentList } = this.state;
        const comments = commentList.length
            ? commentList.map((item, index) => (
                <Card class='comment-card' key={index} title={item.UserName} extra={<span>{item.datetime}</span>}>
                    <p>{item.Comments}</p>
                </Card>
            ))
            : '评论正在努力加载中~';
        return (
            <div>
                {comments}
                <Form class='comment-form' onSubmit={this.handleSubmit}>
                    <FormItem label='请输入您的评论'>
                        {getFieldDecorator('comment', {
                            rules: [{ required: true, message: '不能提交空的评论哦~' }],
                        })(
                            <TextArea autosize={{ minRows: 4, maxRows: 10 }} placeholder='随便写...' />
                            )}
                    </FormItem>
                    <FormItem class='comment-btn'>
                        <Button type='primary' htmlType='submit'>提交评论</Button>
                        <Button type='primary' htmlType='button' onClick={this.addTOCollection}>收藏此新闻</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create({})(Comment)