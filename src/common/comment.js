import React, {Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Card, message } from 'antd'
const FormItem = Form.Item;
const { TextArea } = Input;

class Comment extends Component {


    static propTypes = {
        uniquekey: PropTypes.string
    }
    static defaultProps = {}
    state = {
        commentList: [],
    }

    componentDidMount() {
        if (this.props.uniquekey !== undefined) {
            this.updateComment(this.props.uniquekey);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.uniquekey && nextProps.uniquekey !== this.props.uniquekey) {
            this.updateComment(nextProps.uniquekey);
        }
        return true;
    }
    updateComment = (key) => {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${key}`, { method: 'GET' })
            .then(res => res.json())
            .then(res => this.setState({ commentList: res }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!sessionStorage.hasLogined) {
            message.warning('请先登录');
            return;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const comment=encodeURIComponent(values.comment);
                fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userId=${sessionStorage.UserId}&uniquekey=${this.props.uniquekey}&commnet=${comment}`, { method: 'GET' })
                    .then(res => res.json())
                    .then(res => {
                        if (res === true) {
                            this.updateComment(this.props.uniquekey)
                        }
                    })

                this.props.form.resetFields();
            }
        })
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
            : '该新闻还没有任何评论哦~';
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
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                </Form>
            </div>
        )
    }
}

export default Form.create({})(Comment)